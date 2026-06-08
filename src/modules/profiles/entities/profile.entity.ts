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
    age: number

    @Column({ nullable: true })
    profession: string

    @Column({ nullable: true })
    gender: string

    @Column({ nullable: true })
    religion: string

    @Column({ nullable: true })
    heightCm: number

    @Column({ nullable: true })
    weightKg: number
}