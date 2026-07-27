import { UserSubscriptionEntity } from 'src/modules/subscriptions/entities/user_subscriptions.entity';
import { UserEntity } from 'src/modules/users/entities/users.entity';
import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

@Entity('payments')
export class PaymentEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity)
    user: UserEntity;

    @ManyToOne(() => UserSubscriptionEntity, {
        nullable: true
    })
    subscription: UserSubscriptionEntity;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    amount: string;

    @Column()
    currency: string;

    @Column()
    status: string;

    @Column()
    provider: string;

    @Column()
    razorpayOrderId: string;

    @Column({
        nullable: true
    })
    razorpayPaymentId: string;

    @Column({
        nullable: true
    })
    razorpaySignature: string;
}