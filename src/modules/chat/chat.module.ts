import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ChatController } from './controllers/chat.controller';
import { ChatTokenService } from './services/chat_token.service';
import { ChatTokenEntity } from './entities/chat_token.entity';
import { ChatTokenRepository } from './repositories/chat_token.repository';
// import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ChatTokenEntity]),
        ConfigModule,
        // AuthModule,
    ],
    controllers: [ChatController],
    providers: [ChatTokenService, ChatTokenRepository],
    exports: [ChatTokenService],
})
export class ChatModule { }
