import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('user_sessions')
export class UserSessionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'uuid',
        nullable: false,
    })
    userId: string

    @Column()
    refreshTokenHash: string

    @Column({ nullable: true })
    deviceId: string

    @Column({ nullable: true, type: 'varchar' })
    deviceName: string

    @Column()
    refreshTokenExpiresAt: Date

    @Column()
    accessTokenHash: string

    @Column()
    accessTokenExpiresAt: Date

    @Column({ nullable: true })
    revokedAt: Date

    @CreateDateColumn()
    createdAt: Date
}