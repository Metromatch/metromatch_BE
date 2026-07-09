import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('profile-preferences')
export class ProfilePreference {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    userId: string

    @Column({ nullable: true })
    prefMinAge: number

    @Column({ nullable: true })
    prefMaxAge: number

    @Column({ nullable: true })
    prefMinHeight: string

    @Column({ nullable: true })
    prefMaxHeight: string

    @Column({ nullable: true })
    prefReligion: string

    @Column({ nullable: true })
    prefDiet: string

    @Column({ nullable: true })
    smokingHabits: string

    @Column({ nullable: true })
    drinkingHabits: string

    @Column({ default: new Date() })
    createdAt: Date

    @Column({ default: new Date() })
    updatedAt: Date
}
