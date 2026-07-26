import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserPresence } from '../entities/user_presence.entity';

@Injectable()
export class UserPresenceRepository {
    constructor(
        @InjectRepository(UserPresence)
        private readonly repository: Repository<UserPresence>,
        private readonly dataSource: DataSource,
    ) { }

    /**
     * Upsert a user's presence row.
     * Uses raw SQL so that the PostGIS geography column is written via
     * ST_GeogFromText — TypeORM's .update() cannot handle function expressions
     * and silently skips computed columns, leaving `location` as NULL.
     */
    async upsert(
        profileId: string,
        data: Partial<UserPresence>,
    ): Promise<UserPresence> {
        const { latitude, longitude, online = true } = data as any;

        const pointWkt = `SRID=4326;POINT(${longitude} ${latitude})`;

        await this.dataSource.query(
            `
            INSERT INTO user_presence ("profileId", latitude, longitude, location, online, "updatedAt")
            VALUES ($1, $2, $3, ST_GeogFromText($4), $5, NOW())
            ON CONFLICT ("profileId") DO UPDATE
                SET latitude     = EXCLUDED.latitude,
                    longitude    = EXCLUDED.longitude,
                    location     = EXCLUDED.location,
                    online       = EXCLUDED.online,
                    "updatedAt" = NOW()
            `,
            [profileId, latitude, longitude, pointWkt, online],
        );

        return this.repository.findOne({ where: { profileId } }) as Promise<UserPresence>;
    }

    async findByProfileId(profileId: string): Promise<UserPresence | null> {
        return this.repository.findOne({ where: { profileId } });
    }

    /**
     * Find users within `radiusMeters` of (lat, lng).
     * Uses PostGIS ST_DWithin on the geography column.
     * Returns rows from user_presence ordered by distance ascending.
     */
    async findNearby(
        lat: number,
        lng: number,
        radiusMeters: number,
        excludeProfileId: string,
        limit: number = 50,
    ): Promise<{ profileId: string; distanceMeters: number; latitude: number; longitude: number }[]> {
        const result = await this.dataSource.query(
            `
            SELECT
                up."profileId"         AS "profileId",
                up.latitude         AS latitude,
                up.longitude        AS longitude,
                ST_Distance(
                    up.location,
                    ST_SetSRID(ST_MakePoint($2, $1), 4326)::geography
                ) AS "distanceMeters"
            FROM user_presence up
            WHERE
                up.online = true
                AND up."profileId" != $3
                AND up.location IS NOT NULL
                AND ST_DWithin(
                    up.location,
                    ST_SetSRID(ST_MakePoint($2, $1), 4326)::geography,
                    $4
                )
            ORDER BY "distanceMeters" ASC
            LIMIT $5
            `,
            [lat, lng, excludeProfileId, radiusMeters, limit],
        );
        return result;
    }

    async setOffline(profileId: string): Promise<void> {
        await this.repository.update(
            { profileId },
            { online: false, lastSeenAt: new Date() },
        );
    }
}
