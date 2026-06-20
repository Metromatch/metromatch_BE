import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from '../entities/match.entity';

@Injectable()
export class MatchRepository {
    constructor(
        @InjectRepository(Match)
        private readonly repository: Repository<Match>,
    ) {}

    async create(user1Id: string, user2Id: string): Promise<Match> {
        // Normalise pair order so (A,B) and (B,A) map to the same row
        const [u1, u2] = [user1Id, user2Id].sort();
        const existing = await this.repository.findOne({
            where: { user1Id: u1, user2Id: u2 },
        });
        if (existing) return existing;
        const entity = this.repository.create({ user1Id: u1, user2Id: u2 });
        return this.repository.save(entity);
    }

    async findById(id: string): Promise<Match | null> {
        return this.repository.findOne({ where: { id } });
    }

    async findByUsers(user1Id: string, user2Id: string): Promise<Match | null> {
        const [u1, u2] = [user1Id, user2Id].sort();
        return this.repository.findOne({ where: { user1Id: u1, user2Id: u2 } });
    }

    /** Find all active (not unmatched) matches for a user */
    async findAllForUser(userId: string): Promise<Match[]> {
        return this.repository
            .createQueryBuilder('match')
            .where(
                '(match.user1Id = :userId OR match.user2Id = :userId) AND match.unmatchedAt IS NULL',
                { userId },
            )
            .orderBy('match.matchedAt', 'DESC')
            .getMany();
    }

    async unmatch(id: string): Promise<Match> {
        await this.repository.update({ id }, { unmatchedAt: new Date() });
        return this.repository.findOne({ where: { id } }) as Promise<Match>;
    }
}
