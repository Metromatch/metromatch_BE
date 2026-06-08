import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, length: 15, type: 'varchar', nullable: true })
    phone: string;

    @Column({ unique: true, nullable: true, type: 'varchar' })
    email: string;

    @Column({ nullable: true })
    provider: string

    @Column({ nullable: true })
    providerUserId: string

    @Column({ nullable: true })
    passwordHash: string

    @Column({ default: true })
    isActive: boolean

    @Column({ default: false })
    isVerified: boolean

    @Column({ default: false })
    onboardingCompleted: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}
