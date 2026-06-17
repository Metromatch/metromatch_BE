import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('profiles')
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    userId: string

    @Column({ nullable: false })
    name: string

    @Column({ nullable: false })
    dob: string

    @Column({ nullable: true })
    gender: string

    @Column({ nullable: true })
    drinkingHabits: string

    @Column({ nullable: true })
    smokingHabits: string

    @Column({ nullable: true })
    profession: string

    @Column({ nullable: true })
    religion: string

    @Column({ nullable: true })
    height: string

    @Column({ nullable: true })
    diet: string

    @Column({ nullable: true })
    travelFrequency: string

    @Column({ nullable: true })
    relationshipPreference: string

    @Column({ nullable: true })
    interestedIn: string

    @Column('text', { nullable: true, array: true, default: '{}' })
    travelTimeSlots: string[]

    @Column({ default: new Date() })
    createdAt: Date

    @Column({ default: new Date() })
    updatedAt: Date
}