import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorites.entity';
import { FavoriteRepository } from './repositories/favorites.repository';
import { FavoriteService } from './services/favorites.service';
import { FavoritesController } from './controllers/favorites.controller';
import { MatchesModule } from '../matches/matches.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Favorite]),
        MatchesModule,
        AuthModule,
    ],
    controllers: [FavoritesController],
    providers: [FavoriteRepository, FavoriteService],
    exports: [FavoriteService],
})
export class FavoritesModule { }
