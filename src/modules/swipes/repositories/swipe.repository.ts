import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Swipe, SwipeType } from '../entities/swipe.entity';

@Injectable()
export class SwipeRepository {
    constructor(
        @InjectRepository(Swipe)
        private readonly repository: Repository<Swipe>,
    ) { }

    async create(data: Partial<Swipe>): Promise<Swipe> {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }

    async upsert(data: Partial<Swipe>): Promise<Swipe> {
        await this.repository.upsert(data as Swipe, ['fromProfileId', 'toProfileId']);
        return this.repository.findOne({
            where: { fromProfileId: data.fromProfileId, toProfileId: data.toProfileId },
        }) as Promise<Swipe>;
    }

    async findByUsers(
        fromProfileId: string,
        toProfileId: string,
    ): Promise<Swipe | null> {
        return this.repository.findOne({ where: { fromProfileId, toProfileId } });
    }

    async hasLiked(fromProfileId: string, toProfileId: string): Promise<boolean> {
        const swipe = await this.repository.findOne({
            where: { fromProfileId, toProfileId },
        });
        return (
            !!swipe &&
            (swipe.swipeType === SwipeType.LIKE ||
                swipe.swipeType === SwipeType.SUPER_LIKE)
        );
    }

    async findSentByUser(fromProfileId: string): Promise<Swipe[]> {
        return this.repository.find({ where: { fromProfileId } });
    }

    async findReceivedByUser(toProfileId: string): Promise<Swipe[]> {
        return this.repository.find({ where: { toProfileId } });
    }

    /** Returns every userId that `fromUserId` has already swiped on (any direction). */
    async findSwipedUserIds(fromProfileId: string): Promise<string[]> {
        const rows = await this.repository.find({
            select: { toProfileId: true },
            where: { fromProfileId },
        });
        return rows.map((r) => r.toProfileId);
    }
}
