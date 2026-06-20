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
    ) {}

    async swipe(fromUserId: string, dto: CreateSwipeDto): Promise<SwipeResult> {
        if (fromUserId === dto.toUserId) {
            throw new ConflictException('Cannot swipe on yourself');
        }

        // Upsert swipe (re-swiping updates the type)
        const swipe = await this.swipeRepository.upsert({
            fromUserId,
            toUserId: dto.toUserId,
            swipeType: dto.swipeType,
        });

        // Check for mutual like only when the current swipe is a like/super_like
        const isPositiveSwipe =
            dto.swipeType === SwipeType.LIKE ||
            dto.swipeType === SwipeType.SUPER_LIKE;

        if (isPositiveSwipe) {
            const theyLikedBack = await this.swipeRepository.hasLiked(
                dto.toUserId,
                fromUserId,
            );

            if (theyLikedBack) {
                const match = await this.matchService.createMatch(
                    fromUserId,
                    dto.toUserId,
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
}
