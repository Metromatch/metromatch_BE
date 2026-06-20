import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { MatchRepository } from '../repositories/match.repository';
import { Match } from '../entities/match.entity';

@Injectable()
export class MatchService {
    constructor(private readonly matchRepository: MatchRepository) {}

    /** Idempotent — returns existing match if already created */
    async createMatch(user1Id: string, user2Id: string): Promise<Match> {
        return this.matchRepository.create(user1Id, user2Id);
    }

    async getMatches(userId: string): Promise<Match[]> {
        return this.matchRepository.findAllForUser(userId);
    }

    async getMatchById(id: string): Promise<Match> {
        const match = await this.matchRepository.findById(id);
        if (!match) throw new NotFoundException(`Match ${id} not found`);
        return match;
    }

    async unmatch(userId: string, matchId: string): Promise<Match> {
        const match = await this.matchRepository.findById(matchId);
        if (!match) throw new NotFoundException(`Match ${matchId} not found`);
        if (match.user1Id !== userId && match.user2Id !== userId) {
            throw new ForbiddenException('Not a participant of this match');
        }
        return this.matchRepository.unmatch(matchId);
    }
}
