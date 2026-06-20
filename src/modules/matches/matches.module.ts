import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { MatchRepository } from './repositories/match.repository';
import { MatchService } from './services/match.service';
import { MatchesController } from './controllers/matches.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Match]),
        AuthModule,
    ],
    controllers: [MatchesController],
    providers: [MatchRepository, MatchService],
    exports: [MatchService],
})
export class MatchesModule {}
