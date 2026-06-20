import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PresenceModule } from '../presence/presence.module';
import { Profile } from '../profiles/entities/profiles.entity';
import { DiscoveryService } from './services/discovery.service';
import { DiscoveryController } from './controllers/discovery.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Profile]),
        PresenceModule,
        AuthModule,
    ],
    controllers: [DiscoveryController],
    providers: [DiscoveryService],
})
export class DiscoveryModule {}
