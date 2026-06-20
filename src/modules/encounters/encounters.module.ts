import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encounter } from './entities/encounter.entity';
import { EncounterRepository } from './repositories/encounter.repository';
import { EncounterService } from './services/encounter.service';
import { EncountersController } from './controllers/encounters.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Encounter]),
        AuthModule,
    ],
    controllers: [EncountersController],
    providers: [EncounterRepository, EncounterService],
    exports: [EncounterService],
})
export class EncountersModule {}
