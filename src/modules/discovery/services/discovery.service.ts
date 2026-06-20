import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PresenceService } from '../../presence/services/presence.service';
import { Profile } from '../../profiles/entities/profiles.entity';
import { DiscoveryQueryDto } from '../dto/discovery-query.dto';

@Injectable()
export class DiscoveryService {
    constructor(
        private readonly presenceService: PresenceService,
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>,
    ) {}

    async discoverNearby(userId: string, dto: DiscoveryQueryDto) {
        const { radius = 500, page = 1, limit = 20 } = dto;

        // Get caller's current location
        const myPresence = await this.presenceService.getPresence(userId);
        if (!myPresence || myPresence.latitude == null || myPresence.longitude == null) {
            return {
                data: [],
                meta: { total: 0, page, limit, totalPages: 0 },
                message: 'Update your location first to discover nearby users',
            };
        }

        // Find all nearby user IDs (with distance), excluding self
        const nearbyPresences = await this.presenceService.getNearby(
            userId,
            Number(myPresence.latitude),
            Number(myPresence.longitude),
            radius,
            1000, // fetch a large set, we'll paginate in memory after profile join
        );

        if (nearbyPresences.length === 0) {
            return {
                data: [],
                meta: { total: 0, page, limit, totalPages: 0 },
            };
        }

        const nearbyUserIds = nearbyPresences.map((p) => p.userId);
        const distanceMap = new Map(
            nearbyPresences.map((p) => [p.userId, Math.round(p.distanceMeters)]),
        );

        // Join with profiles
        const profiles = await this.profileRepository
            .createQueryBuilder('profile')
            .where('profile.userId IN (:...ids)', { ids: nearbyUserIds })
            .getMany();

        // Merge distance into profile result
        const enriched = profiles.map((profile) => ({
            ...profile,
            distanceMeters: distanceMap.get(profile.userId) ?? null,
        }));

        // Sort by distance ascending
        enriched.sort((a, b) => (a.distanceMeters ?? 0) - (b.distanceMeters ?? 0));

        // Manual pagination
        const total = enriched.length;
        const skip = (page - 1) * limit;
        const paginated = enriched.slice(skip, skip + limit);

        return {
            data: paginated,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}
