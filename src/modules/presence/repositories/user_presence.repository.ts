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

    async upsert(
        userId: string,
        data: Partial<UserPresence>,
    ): Promise<UserPresence> {
        const existing = await this.repository.findOne({ where: { userId } });
        if (existing) {
            return await this.repository.update({ userId }, data) as any;
            // return a as UserPresence;
            // return this.repository.findOne({ where: { userId } }) as Promise<UserPresence>;
        }
        const entity = this.repository.create({ userId, ...data });
        return this.repository.save(entity);
    }

    async findByUserId(userId: string): Promise<UserPresence | null> {
        return this.repository.findOne({ where: { userId } });
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
        excludeUserId: string,
        limit: number = 50,
    ): Promise<{ userId: string; distanceMeters: number; latitude: number; longitude: number }[]> {
        const result = await this.dataSource.query(
            `
            SELECT
                up.user_id          AS "userId",
                up.latitude         AS latitude,
                up.longitude        AS longitude,
                ST_Distance(
                    up.location,
                    ST_SetSRID(ST_MakePoint($2, $1), 4326)::geography
                ) AS "distanceMeters"
            FROM user_presence up
            WHERE
                up.online = true
                AND up.user_id != $3
                AND up.location IS NOT NULL
                AND ST_DWithin(
                    up.location,
                    ST_SetSRID(ST_MakePoint($2, $1), 4326)::geography,
                    $4
                )
            ORDER BY "distanceMeters" ASC
            LIMIT $5
            `,
            [lat, lng, excludeUserId, radiusMeters, limit],
        );
        return result;
    }

    async setOffline(userId: string): Promise<void> {
        await this.repository.update(
            { userId },
            { online: false, lastSeenAt: new Date() },
        );
    }
}
