
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SubscriptionPlanEntity } from "./subscription_plans.entity";
import { UserEntity } from "src/modules/users/entities/users.entity";

@Entity('user_subscriptions')
export class UserSubscriptionEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column()
    planId: string;

    @Column()
    status: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column({
        default: false
    })
    autoRenew: boolean;
}