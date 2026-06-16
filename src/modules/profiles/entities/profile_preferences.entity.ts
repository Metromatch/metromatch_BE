import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('profile-preferences')
export class ProfilePreference {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    userId: string

    @Column({ nullable: true })
    minAge: number

    @Column({ nullable: true })
    maxAge: number

    @Column({ nullable: true })
    minHeightCm: number

    @Column({ nullable: true })
    maxHeightCm: number

    @Column({ nullable: true })
    religion: string

    @Column({ nullable: true })
    diet: string

    @Column({ nullable: true })
    smokingHabits: string

    @Column({ nullable: true })
    drinkingHabits: string

    @Column({ default: new Date() })
    createdAt: Date

    @Column({ default: new Date() })
    updatedAt: Date
}
