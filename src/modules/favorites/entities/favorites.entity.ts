import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

@Entity('favorites')
@Unique(['fromProfileId', 'toProfileId'])
export class Favorite {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fromProfileId: string;

    @Column()
    toProfileId: string;

    @Column({ type: 'timestamp', default: () => 'NOW()' })
    createdAt: Date;
}
