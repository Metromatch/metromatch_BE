import { Injectable } from '@nestjs/common';
import { ProfilePreferenceRepository } from '../repositories/profile_preferences.repository';
import { ProfilePreference } from '../entities/profile_preferences.entity';

@Injectable()
export class ProfilePreferenceService {
    constructor(private readonly profilePreferenceRepository: ProfilePreferenceRepository) {}

    async create(data: Partial<ProfilePreference>): Promise<ProfilePreference> {
        return this.profilePreferenceRepository.create(data);
    }

    async findById(id: string): Promise<ProfilePreference | null> {
        return this.profilePreferenceRepository.findById(id);
    }

    async findByUserId(userId: string): Promise<ProfilePreference | null> {
        return this.profilePreferenceRepository.findByUserId(userId);
    }

    async updateById(id: string, data: Partial<ProfilePreference>): Promise<any> {
        return this.profilePreferenceRepository.updateById(id, data);
    }
}
