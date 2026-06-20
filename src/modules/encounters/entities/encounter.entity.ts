import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('encounters')
export class Encounter {
    /** Always store with user1Id < user2Id (sorted) for uniqueness */
    @PrimaryColumn('uuid')
    user1Id: string;

    @PrimaryColumn('uuid')
    user2Id: string;

    @Column({ type: 'int', default: 0 })
    encounterCount: number;

    @Column({ type: 'int', default: 0 })
    totalMinutesTogether: number;

    @Column({ type: 'timestamp', nullable: true })
    firstEncounterAt: Date | null;

    @Column({ type: 'timestamp', nullable: true })
    lastEncounterAt: Date | null;

    @Column({ type: 'int', nullable: true })
    closestDistanceMeters: number | null;
}
