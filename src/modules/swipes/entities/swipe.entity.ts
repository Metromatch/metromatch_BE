import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

export enum SwipeType {
    LIKE = 'like',
    PASS = 'pass',
    SUPER_LIKE = 'super_like',
}

@Entity('swipes')
@Unique(['fromUserId', 'toUserId'])
export class Swipe {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fromUserId: string;

    @Column()
    toUserId: string;

    @Column({ type: 'varchar', length: 20 })
    swipeType: SwipeType;

    @Column({ type: 'timestamp', default: () => 'NOW()' })
    createdAt: Date;
}
