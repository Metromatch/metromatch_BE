import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionPlanEntity } from '../entities/subscription_plans.entity';

@Injectable()
export class SubscriptionPlanRepository {
    constructor(
        @InjectRepository(SubscriptionPlanEntity)
        private readonly repository: Repository<SubscriptionPlanEntity>,
    ) { }

    async create(data: Partial<SubscriptionPlanEntity>): Promise<SubscriptionPlanEntity> {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }
    async findAllActive(): Promise<SubscriptionPlanEntity[]> {
        return this.repository.find({
            where: {
                isActive: true
            }
        });
    }

}
