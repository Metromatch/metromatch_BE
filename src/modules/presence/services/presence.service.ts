import { Injectable } from '@nestjs/common';
import { UserPresenceRepository } from '../repositories/user_presence.repository';
import { UpdatePresenceDto } from '../dto/update-presence.dto';
import { UserPresence } from '../entities/user_presence.entity';

@Injectable()
export class PresenceService {
    constructor(
        private readonly userPresenceRepository: UserPresenceRepository,
    ) { }

    async updatePresence(
        profileId: string,
        dto: UpdatePresenceDto,
    ): Promise<UserPresence> {
        return this.userPresenceRepository.upsert(profileId, {
            latitude: dto.latitude,
            longitude: dto.longitude,
            online: dto.online ?? true,
        });
    }


    async setOffline(profileId: string): Promise<void> {
        return this.userPresenceRepository.setOffline(profileId);
    }

    async getPresence(profileId: string): Promise<UserPresence | null> {
        return this.userPresenceRepository.findByProfileId(profileId);
    }

    async getNearby(
        requestingProfileId: string,
        lat: number,
        lng: number,
        radiusMeters: number,
        limit: number,
    ) {
        return this.userPresenceRepository.findNearby(
            lat,
            lng,
            radiusMeters,
            requestingProfileId,
            limit,
        );
    }
}
