// subscription-plan.entity.ts

import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('subscription_plans')
export class SubscriptionPlanEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    price: number;

    @Column()
    durationDays: number;

    @Column({
        nullable: true,
    })
    razorpayPlanId: string;

    @Column({
        default: true,
    })
    isActive: boolean;
}