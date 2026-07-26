import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from '../entities/match.entity';
import { Profile } from 'src/modules/profiles/entities/profiles.entity';

@Injectable()
export class MatchRepository {
    constructor(
        @InjectRepository(Match)
        private readonly repository: Repository<Match>,
    ) { }

    async create(user1ProfileId: string, user2ProfileId: string): Promise<Match> {
        // Normalise pair order so (A,B) and (B,A) map to the same row
        const [u1, u2] = [user1ProfileId, user2ProfileId].sort();
        const existing = await this.repository.findOne({
            where: { user1ProfileId: u1, user2ProfileId: u2 },
        });
        if (existing) return existing;
        const entity = this.repository.create({ user1ProfileId: u1, user2ProfileId: u2 });
        return this.repository.save(entity);
    }

    async findById(id: string): Promise<Match | null> {
        return this.repository.findOne({ where: { id } });
    }

    async findByUsers(user1ProfileId: string, user2ProfileId: string): Promise<Match | null> {
        const [u1, u2] = [user1ProfileId, user2ProfileId].sort();
        return this.repository.findOne({ where: { user1ProfileId: u1, user2ProfileId: u2 } });
    }

    /** Find all active (not unmatched) matches for a user */
    async findAllForUser(profileId: string): Promise<Match[]> {
        //get only the name and Id of the other user (if user1Id is the id of the other user, get user2Id and name, else get user1Id and name) 
        //we can use a join from profile table 
        return this.repository
            .createQueryBuilder('match')
            .leftJoinAndMapOne("match.user1Profile", Profile, 'user1Profile', 'user1Profile.id = match."user1ProfileId"::uuid')
            .leftJoinAndMapOne("match.user2Profile", Profile, 'user2Profile', 'user2Profile.id = match."user2ProfileId"::uuid')
            .select('match.id as id')
            .addSelect(`CASE WHEN match.user1ProfileId = :profileId THEN match.user2ProfileId ELSE match.user1ProfileId END`, 'profileId')
            .addSelect(`CASE WHEN match.user1ProfileId = :profileId THEN user2Profile.name ELSE user1Profile.name END`, 'name')
            .where(
                '(match."user1ProfileId" = :profileId OR match."user2ProfileId" = :profileId) AND match.unmatchedAt IS NULL',
                { profileId },
            )
            .orderBy('match.matchedAt', 'DESC')
            .getRawMany();
    }

    async unmatch(id: string): Promise<Match> {
        await this.repository.update({ id }, { unmatchedAt: new Date() });
        return this.repository.findOne({ where: { id } }) as Promise<Match>;
    }
}
