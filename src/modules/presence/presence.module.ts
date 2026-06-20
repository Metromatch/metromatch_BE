import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPresence } from './entities/user_presence.entity';
import { UserPresenceRepository } from './repositories/user_presence.repository';
import { PresenceService } from './services/presence.service';
import { PresenceController } from './controllers/presence.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserPresence]),
        AuthModule,
    ],
    controllers: [PresenceController],
    providers: [UserPresenceRepository, PresenceService],
    exports: [PresenceService],
})
export class PresenceModule {}
