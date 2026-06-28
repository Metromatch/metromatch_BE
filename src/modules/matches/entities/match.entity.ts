import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    CreateDateColumn,
} from 'typeorm';

@Entity('matches')
@Unique(['user1Id', 'user2Id'])
export class Match {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user1Id: string;

    @Column()
    user2Id: string;

    @CreateDateColumn()
    matchedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    unmatchedAt: Date | null;

    @Column({ type: 'timestamp', nullable: true })
    lastMessageAt: Date | null;

    @Column({ nullable: true })
    twilioConversationSid: string | null;
}
