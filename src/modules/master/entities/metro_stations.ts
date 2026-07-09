import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('metro_stations')
export class MetroStationsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    name: string

    @Column({ unique: true, nullable: false, comment: 'concatenation of name and place' })
    unique_name_and_place: string

    @Column({ nullable: false })
    line: string

    @Column({ nullable: false })
    place: string

}