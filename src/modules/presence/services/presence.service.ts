import { Injectable } from '@nestjs/common';
import { UserPresenceRepository } from '../repositories/user_presence.repository';
import { UpdatePresenceDto } from '../dto/update-presence.dto';
import { UserPresence } from '../entities/user_presence.entity';

@Injectable()
export class PresenceService {
    constructor(
        private readonly userPresenceRepository: UserPresenceRepository,
    ) {}

    async updatePresence(
        userId: string,
        dto: UpdatePresenceDto,
    ): Promise<UserPresence> {
        const pointWkt = `SRID=4326;POINT(${dto.longitude} ${dto.latitude})`;
        return this.userPresenceRepository.upsert(userId, {
            latitude: dto.latitude,
            longitude: dto.longitude,
            location: () => `ST_GeogFromText('${pointWkt}')` as any,
            online: dto.online ?? true,
        });
    }

    async setOffline(userId: string): Promise<void> {
        return this.userPresenceRepository.setOffline(userId);
    }

    async getPresence(userId: string): Promise<UserPresence | null> {
        return this.userPresenceRepository.findByUserId(userId);
    }

    async getNearby(
        requestingUserId: string,
        lat: number,
        lng: number,
        radiusMeters: number,
        limit: number,
    ) {
        return this.userPresenceRepository.findNearby(
            lat,
            lng,
            radiusMeters,
            requestingUserId,
            limit,
        );
    }
}
