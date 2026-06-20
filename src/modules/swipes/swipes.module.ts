import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Swipe } from './entities/swipe.entity';
import { SwipeRepository } from './repositories/swipe.repository';
import { SwipeService } from './services/swipe.service';
import { SwipesController } from './controllers/swipes.controller';
import { MatchesModule } from '../matches/matches.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Swipe]),
        MatchesModule,
        AuthModule,
    ],
    controllers: [SwipesController],
    providers: [SwipeRepository, SwipeService],
    exports: [SwipeService],
})
export class SwipesModule {}
