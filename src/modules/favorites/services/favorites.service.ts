import { ConflictException, Injectable } from '@nestjs/common';
import { FavoriteRepository } from '../repositories/favorites.repository';
import { FavoriteDto } from '../dto/favorites.dto';
import { Favorite } from '../entities/favorites.entity';

export interface FavoriteResult {
    Favorite: Favorite;
    matched: boolean;
    matchId?: string;
}

@Injectable()
export class FavoriteService {
    constructor(
        private readonly favoriteRepository: FavoriteRepository,
    ) { }

    async markFavorite(fromProfileId: string, dto: FavoriteDto): Promise<Favorite> {
        if (fromProfileId === dto.profileId) {
            throw new ConflictException('Cannot Favorite on yourself');
        }

        return this.favoriteRepository.create({
            fromProfileId,
            toProfileId: dto.profileId
        });
    }

    async removeFavorite(fromProfileId: string, toProfileId: string): Promise<void> {
        await this.favoriteRepository.delete(fromProfileId, toProfileId);
    }
}

