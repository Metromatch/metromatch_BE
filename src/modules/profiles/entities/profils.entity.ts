import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('profiles')
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    userId: string

    @Column({ nullable: true })
    name: string

    @Column({ nullable: true })
    dob: Date

    @Column({ nullable: true })
    drinkingHabits: string

    @Column({ nullable: true })
    smokingHabits: string

    @Column({ nullable: true })
    gender: string

    @Column({ nullable: true })
    religion: string

    @Column({ nullable: true })
    heightCm: number

    @Column({ nullable: true })
    weightKg: number

    @Column({ nullable: true })
    diet: string

    @Column({ nullable: true })
    travelFrequency: string

    @Column('text', { nullable: true, array: true, default: '{}' })
    travelTimeSlots: string[]

    @Column({ default: new Date() })
    createdAt: Date

    @Column({ default: new Date() })
    updatedAt: Date
}