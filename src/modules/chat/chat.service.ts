import {
    Injectable,
    ForbiddenException,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Twilio from 'twilio';
import { Match } from '../matches/entities/match.entity';

@Injectable()
export class ChatService {
    private readonly client: Twilio.Twilio;
    private readonly conversationsServiceSid: string;
    private readonly accountSid: string;
    private readonly apiKeySid: string;
    private readonly apiKeySecret: string;

    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(Match)
        private readonly matchRepository: Repository<Match>,
    ) {
        const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID') ?? '';
        const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN') ?? '';
        this.accountSid = accountSid;
        this.apiKeySid = this.configService.get<string>('TWILIO_API_KEY_SID') ?? '';
        this.apiKeySecret = this.configService.get<string>('TWILIO_API_KEY_SECRET') ?? '';
        this.conversationsServiceSid =
            this.configService.get<string>('TWILIO_CONVERSATIONS_SERVICE_SID') ?? '';

        this.client = Twilio(accountSid, authToken);
    }

    // ────────────────────────────────────────────────────────────────────────────
    // Access Token
    // ────────────────────────────────────────────────────────────────────────────

    /**
     * Issues a short-lived Twilio Access Token with a Conversations grant.
     * The mobile app uses this to identify itself to Twilio.
     */
    generateAccessToken(userId: string): string {
        const AccessToken = Twilio.jwt.AccessToken;
        const ChatGrant = AccessToken.ChatGrant;

        const grant = new ChatGrant({
            serviceSid: this.conversationsServiceSid,
        });

        const token = new AccessToken(
            this.accountSid,
            this.apiKeySid,
            this.apiKeySecret,
            {
                identity: userId,
                ttl: 3600, // 1 hour
            },
        );
        token.addGrant(grant);
        return token.toJwt();
    }

    // ────────────────────────────────────────────────────────────────────────────
    // Conversation provisioning
    // ────────────────────────────────────────────────────────────────────────────

    /**
     * Ensures a Twilio Conversation exists for the given match.
     * Idempotent — stores the SID on the Match row after first creation.
     */
    async getOrCreateConversation(matchId: string, requestingUserId: string): Promise<{ conversationSid: string }> {
        const match = await this.matchRepository.findOne({ where: { id: matchId } });
        if (!match) throw new NotFoundException(`Match ${matchId} not found`);

        // Auth check — only participants may access the conversation
        if (match.user1Id !== requestingUserId && match.user2Id !== requestingUserId) {
            throw new ForbiddenException('Not a participant of this match');
        }

        // Already provisioned
        if (match.twilioConversationSid) {
            return { conversationSid: match.twilioConversationSid };
        }

        // Create a new Twilio Conversation
        try {
            const conversation = await this.client
                .conversations.v1
                .services(this.conversationsServiceSid)
                .conversations.create({
                    uniqueName: `match-${matchId}`,
                    friendlyName: `Match ${matchId}`,
                });

            const sid = conversation.sid;

            // Add both participants
            for (const participantId of [match.user1Id, match.user2Id]) {
                try {
                    await this.client
                        .conversations.v1
                        .services(this.conversationsServiceSid)
                        .conversations(sid)
                        .participants.create({ identity: participantId });
                } catch (err: any) {
                    // 50433 = participant already exists — safe to ignore
                    if (err?.code !== 50433) throw err;
                }
            }

            // Persist SID
            await this.matchRepository.update({ id: matchId }, { twilioConversationSid: sid });
            match.twilioConversationSid = sid;

            return { conversationSid: sid };
        } catch (err: any) {
            // If uniqueName collision (conversation already created by a race), fetch it
            if (err?.code === 50433 || err?.code === 50301) {
                const conversation = await this.client
                    .conversations.v1
                    .services(this.conversationsServiceSid)
                    .conversations(`match-${matchId}`)
                    .fetch();
                await this.matchRepository.update({ id: matchId }, { twilioConversationSid: conversation.sid });
                return { conversationSid: conversation.sid };
            }
            throw new InternalServerErrorException('Failed to create conversation: ' + err?.message);
        }
    }

    // ────────────────────────────────────────────────────────────────────────────
    // Messages
    // ────────────────────────────────────────────────────────────────────────────

    /** Send a message to the match conversation */
    async sendMessage(
        matchId: string,
        senderUserId: string,
        body: string,
    ): Promise<{ sid: string; author: string; body: string; dateCreated: Date }> {
        const { conversationSid } = await this.getOrCreateConversation(matchId, senderUserId);

        const message = await this.client
            .conversations.v1
            .services(this.conversationsServiceSid)
            .conversations(conversationSid)
            .messages.create({ author: senderUserId, body });

        // Update lastMessageAt on the match
        await this.matchRepository.update({ id: matchId }, { lastMessageAt: new Date() });

        return {
            sid: message.sid,
            author: message.author,
            body: message.body ?? '',
            dateCreated: message.dateCreated ?? new Date(),
        };
    }

    /** Fetch messages for a match conversation (newest first, paginated) */
    async getMessages(
        matchId: string,
        requestingUserId: string,
        pageSize = 50,
        order: 'asc' | 'desc' = 'desc',
    ): Promise<
        { sid: string; author: string; body: string; dateCreated: Date; index: number }[]
    > {
        const { conversationSid } = await this.getOrCreateConversation(matchId, requestingUserId);

        const messages = await this.client
            .conversations.v1
            .services(this.conversationsServiceSid)
            .conversations(conversationSid)
            .messages.list({ order, limit: pageSize });

        return messages.map((m) => ({
            sid: m.sid,
            author: m.author,
            body: m.body ?? '',
            dateCreated: m.dateCreated ?? new Date(),
            index: m.index,
        }));
    }
}
