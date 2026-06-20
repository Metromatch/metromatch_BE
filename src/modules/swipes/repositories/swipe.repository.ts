import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Swipe, SwipeType } from '../entities/swipe.entity';

@Injectable()
export class SwipeRepository {
    constructor(
        @InjectRepository(Swipe)
        private readonly repository: Repository<Swipe>,
    ) {}

    async create(data: Partial<Swipe>): Promise<Swipe> {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }

    async upsert(data: Partial<Swipe>): Promise<Swipe> {
        await this.repository.upsert(data as Swipe, ['fromUserId', 'toUserId']);
        return this.repository.findOne({
            where: { fromUserId: data.fromUserId, toUserId: data.toUserId },
        }) as Promise<Swipe>;
    }

    async findByUsers(
        fromUserId: string,
        toUserId: string,
    ): Promise<Swipe | null> {
        return this.repository.findOne({ where: { fromUserId, toUserId } });
    }

    async hasLiked(fromUserId: string, toUserId: string): Promise<boolean> {
        const swipe = await this.repository.findOne({
            where: { fromUserId, toUserId },
        });
        return (
            !!swipe &&
            (swipe.swipeType === SwipeType.LIKE ||
                swipe.swipeType === SwipeType.SUPER_LIKE)
        );
    }

    async findSentByUser(userId: string): Promise<Swipe[]> {
        return this.repository.find({ where: { fromUserId: userId } });
    }

    async findReceivedByUser(userId: string): Promise<Swipe[]> {
        return this.repository.find({ where: { toUserId: userId } });
    }
}
