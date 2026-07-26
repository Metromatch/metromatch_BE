import {
    Controller,
    Get,
    Request,
    UseGuards,
    UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ChatTokenService } from '../services/chat_token.service';

@ApiTags('chat')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
    constructor(private readonly chatTokenService: ChatTokenService) { }

    /** Returns an existing Stream token for the current user, or creates one if absent. */
    @ApiOperation({ summary: 'Get (or create) the Stream chat token for the current user' })
    @Get('chattoken')
    async getToken(@Request() req: any) {
        const userId = req.user?.sub || req.user?.userId;
        if (!userId) throw new UnauthorizedException();

        // Try to get existing token first
        let token = await this.chatTokenService.getChatToken(userId);

        // If no token, create one on the fly
        if (!token) {
            token = await this.chatTokenService.createChatToken(userId);
        }

        return { token };
    }

    /** Explicitly creates / refreshes the Stream token for the current user. */
    @ApiOperation({ summary: 'Create / refresh the Stream chat token for the current user' })
    @Get('create-chat-token')
    async createToken(@Request() req: any) {
        const userId = req.user?.sub || req.user?.userId;
        if (!userId) throw new UnauthorizedException();
        const token = await this.chatTokenService.createChatToken(userId);
        return { token };
    }
}
