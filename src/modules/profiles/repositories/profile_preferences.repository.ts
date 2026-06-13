import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProfilePreference } from "../entities/profile_preferences.entity";

@Injectable()
export class ProfilePreferenceRepository {
    constructor(
        @InjectRepository(ProfilePreference)
        private readonly repository: Repository<ProfilePreference>,
    ) { }

    async create(data: Partial<ProfilePreference>): Promise<ProfilePreference> {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }

    async findById(id: string): Promise<ProfilePreference | null> {
        return this.repository.findOne({ where: { id } });
    }

    async findByUserId(userId: string): Promise<ProfilePreference | null> {
        return this.repository.findOne({ where: { userId } });
    }

    async updateById(id: string, data: Partial<ProfilePreference>): Promise<any> {
        return this.repository.update({ id }, data);
    }
}
