import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('user_presence')
export class UserPresence {
    @PrimaryColumn('uuid')
    userId: string;

    @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
    latitude: number;

    @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
    longitude: number;

    /**
     * PostGIS GEOGRAPHY(Point, 4326) column.
     * Requires the PostGIS extension to be enabled on the database:
     *   CREATE EXTENSION IF NOT EXISTS postgis;
     * And the spatial index created manually:
     *   CREATE INDEX idx_presence_location ON user_presence USING GIST(location);
     */
    @Column({
        type: 'geography',
        spatialFeatureType: 'Point',
        srid: 4326,
        nullable: true,
    })
    location: object;

    @Column({ default: true })
    online: boolean;

    @Column({ type: 'timestamp', nullable: true })
    lastSeenAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
