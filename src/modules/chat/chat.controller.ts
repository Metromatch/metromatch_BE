import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Request,
    UseGuards,
    UnauthorizedException,
    ParseUUIDPipe,
    Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';

@ApiTags('chat')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    // ── Token ──────────────────────────────────────────────────────────────────

    @ApiOperation({ summary: 'Get a Twilio Access Token for the current user' })
    @Get('token')
    async getToken(@Request() req: any) {
        const userId = req.user?.sub || req.user?.userId;
        if (!userId) throw new UnauthorizedException();
        const token = this.chatService.generateAccessToken(userId);
        return { token };
    }

    // ── Conversation ───────────────────────────────────────────────────────────

    @ApiOperation({ summary: 'Get (or create) the Twilio Conversation for a match' })
    @Get('matches/:matchId/conversation')
    async getConversation(
        @Request() req: any,
        @Param('matchId', ParseUUIDPipe) matchId: string,
    ) {
        const userId = req.user?.sub || req.user?.userId;
        if (!userId) throw new UnauthorizedException();
        return this.chatService.getOrCreateConversation(matchId, userId);
    }

    // ── Messages ───────────────────────────────────────────────────────────────

    @ApiOperation({ summary: 'Send a message in a match conversation' })
    @Post('matches/:matchId/messages')
    async sendMessage(
        @Request() req: any,
        @Param('matchId', ParseUUIDPipe) matchId: string,
        @Body() dto: SendMessageDto,
    ) {
        const userId = req.user?.sub || req.user?.userId;
        if (!userId) throw new UnauthorizedException();
        return this.chatService.sendMessage(matchId, userId, dto.body);
    }

    @ApiOperation({ summary: 'Fetch messages in a match conversation' })
    @ApiQuery({ name: 'pageSize', required: false, type: Number })
    @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'] })
    @Get('matches/:matchId/messages')
    async getMessages(
        @Request() req: any,
        @Param('matchId', ParseUUIDPipe) matchId: string,
        @Query('pageSize') pageSize?: number,
        @Query('order') order?: 'asc' | 'desc',
    ) {
        const userId = req.user?.sub || req.user?.userId;
        if (!userId) throw new UnauthorizedException();
        return this.chatService.getMessages(
            matchId,
            userId,
            pageSize ? Number(pageSize) : 50,
            order ?? 'desc',
        );
    }
}
