import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('profile-photos')
export class ProfilePhoto {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    userId: string

    @Column({ nullable: true })
    imageUrl: string

    @Column({ nullable: true })
    displayOrder: number

    @Column({ nullable: true, default: false })
    isPrimary: boolean

    @Column({ default: new Date() })
    createdAt: Date

    @Column({ default: new Date() })
    updatedAt: Date
}