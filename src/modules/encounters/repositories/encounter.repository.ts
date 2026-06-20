import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Encounter } from '../entities/encounter.entity';

@Injectable()
export class EncounterRepository {
    constructor(
        @InjectRepository(Encounter)
        private readonly repository: Repository<Encounter>,
    ) {}

    /** Normalise pair so user1Id < user2Id always */
    private normalise(a: string, b: string): [string, string] {
        return a < b ? [a, b] : [b, a];
    }

    async upsert(
        userAId: string,
        userBId: string,
        distanceMeters: number,
        minutesTogether: number = 0,
    ): Promise<Encounter> {
        const [user1Id, user2Id] = this.normalise(userAId, userBId);
        const existing = await this.repository.findOne({
            where: { user1Id, user2Id },
        });

        const now = new Date();

        if (existing) {
            await this.repository.update(
                { user1Id, user2Id },
                {
                    encounterCount: existing.encounterCount + 1,
                    totalMinutesTogether:
                        existing.totalMinutesTogether + minutesTogether,
                    lastEncounterAt: now,
                    closestDistanceMeters:
                        existing.closestDistanceMeters == null
                            ? distanceMeters
                            : Math.min(
                                  existing.closestDistanceMeters,
                                  distanceMeters,
                              ),
                },
            );
            return this.repository.findOne({ where: { user1Id, user2Id } }) as Promise<Encounter>;
        }

        const entity = this.repository.create({
            user1Id,
            user2Id,
            encounterCount: 1,
            totalMinutesTogether: minutesTogether,
            firstEncounterAt: now,
            lastEncounterAt: now,
            closestDistanceMeters: distanceMeters,
        });
        return this.repository.save(entity);
    }

    async findByUsers(
        userAId: string,
        userBId: string,
    ): Promise<Encounter | null> {
        const [user1Id, user2Id] = this.normalise(userAId, userBId);
        return this.repository.findOne({ where: { user1Id, user2Id } });
    }

    async findAllForUser(userId: string): Promise<Encounter[]> {
        return this.repository
            .createQueryBuilder('encounter')
            .where(
                'encounter.user1Id = :userId OR encounter.user2Id = :userId',
                { userId },
            )
            .orderBy('encounter.lastEncounterAt', 'DESC')
            .getMany();
    }
}
