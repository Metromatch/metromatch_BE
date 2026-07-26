import { ConflictException, Injectable } from '@nestjs/common';
import { SwipeRepository } from '../repositories/swipe.repository';
import { MatchService } from '../../matches/services/match.service';
import { CreateSwipeDto } from '../dto/create-swipe.dto';
import { Swipe, SwipeType } from '../entities/swipe.entity';

export interface SwipeResult {
    swipe: Swipe;
    matched: boolean;
    matchId?: string;
}

@Injectable()
export class SwipeService {
    constructor(
        private readonly swipeRepository: SwipeRepository,
        private readonly matchService: MatchService,
    ) { }

    async swipe(fromProfileId: string, dto: CreateSwipeDto): Promise<SwipeResult> {
        if (fromProfileId === dto.toProfileId) {
            throw new ConflictException('Cannot swipe on yourself');
        }

        // Upsert swipe (re-swiping updates the type)
        const swipe = await this.swipeRepository.upsert({
            fromProfileId,
            toProfileId: dto.toProfileId,
            swipeType: dto.swipeType,
        });

        // Check for mutual like only when the current swipe is a like/super_like
        const isPositiveSwipe =
            dto.swipeType === SwipeType.LIKE ||
            dto.swipeType === SwipeType.SUPER_LIKE;

        if (isPositiveSwipe) {
            const theyLikedBack = await this.swipeRepository.hasLiked(
                dto.toProfileId,
                fromProfileId,
            );

            if (theyLikedBack) {
                const match = await this.matchService.createMatch(
                    fromProfileId,
                    dto.toProfileId,
                );
                return { swipe, matched: true, matchId: match.id };
            }
        }

        return { swipe, matched: false };
    }

    async getSwipesSent(userId: string): Promise<Swipe[]> {
        return this.swipeRepository.findSentByUser(userId);
    }

    async getSwipesReceived(userId: string): Promise<Swipe[]> {
        return this.swipeRepository.findReceivedByUser(userId);
    }

    /** All userIds the given user has already swiped on — used by discovery to exclude them. */
    async getSwipedProfileIds(profileId: string): Promise<string[]> {
        return this.swipeRepository.findSwipedUserIds(profileId);
    }
}

