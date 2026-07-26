import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    CreateDateColumn,
} from 'typeorm';

@Entity('matches')
@Unique(['user1ProfileId', 'user2ProfileId'])
export class Match {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user1ProfileId: string;

    @Column()
    user2ProfileId: string;

    @CreateDateColumn()
    matchedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    unmatchedAt: Date | null;

    @Column({ type: 'timestamp', nullable: true })
    lastMessageAt: Date | null;

    @Column({ type: 'varchar', nullable: true })
    twilioConversationSid: string | null;
}
