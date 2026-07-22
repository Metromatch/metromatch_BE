import {
    Controller,
    Get,
    Request,
    UseGuards,
    UnauthorizedException,
    Post,
    Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ChatTokenService } from '../services/chat_token.service';

@ApiTags('chat')
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
    constructor(private readonly chatTokenService: ChatTokenService) { }


    @ApiOperation({ summary: 'get chat token for the current user' })
    @Get('chattoken')
    async getToken(@Request() req: any) {
        const userId = req.user?.sub || req.user?.userId;
        if (!userId) throw new UnauthorizedException();
        const token = this.chatTokenService.getChatToken(userId);
        return { token };
    }

    // create token for the current user
    @Get('create-chat-token')
    async createToken(@Request() req: any) {
        const userId = req.user?.sub || req.user?.userId;
        if (!userId) throw new UnauthorizedException();
        const token = this.chatTokenService.createChatToken(userId);
        return { token };
    }

    // @Post('create-chat-token')
    // async createToken(@Body() body: any) {
    //     const userId = body.userId;
    //     if (!userId) throw new UnauthorizedException();
    //     const token = await this.chatTokenService.createChatToken(userId);
    //     return { token };
    // }

}
