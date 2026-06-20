import { Injectable, NotFoundException } from '@nestjs/common';
import { EncounterRepository } from '../repositories/encounter.repository';
import { Encounter } from '../entities/encounter.entity';

@Injectable()
export class EncounterService {
    constructor(
        private readonly encounterRepository: EncounterRepository,
    ) {}

    /**
     * Record (or update) an encounter between two users.
     * Intended to be called by background presence-matching jobs or WebSocket handlers.
     */
    async recordEncounter(
        userAId: string,
        userBId: string,
        distanceMeters: number,
        minutesTogether: number = 0,
    ): Promise<Encounter> {
        return this.encounterRepository.upsert(
            userAId,
            userBId,
            distanceMeters,
            minutesTogether,
        );
    }

    async getEncounters(userId: string): Promise<Encounter[]> {
        return this.encounterRepository.findAllForUser(userId);
    }

    async getEncounterWithUser(
        userId: string,
        otherUserId: string,
    ): Promise<Encounter> {
        const encounter = await this.encounterRepository.findByUsers(
            userId,
            otherUserId,
        );
        if (!encounter) {
            throw new NotFoundException(
                `No encounter found between ${userId} and ${otherUserId}`,
            );
        }
        return encounter;
    }
}
