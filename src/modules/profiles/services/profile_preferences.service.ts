import { Injectable } from '@nestjs/common';
import { ProfilePreferenceRepository } from '../repositories/profile_preferences.repository';
import { ProfilePreference } from '../entities/profile_preferences.entity';
import { CreateProfileDto } from '../dto/create-profile.dto';

@Injectable()
export class ProfilePreferenceService {
    constructor(private readonly profilePreferenceRepository: ProfilePreferenceRepository) { }

    async create(data: CreateProfileDto & { userId: string }): Promise<ProfilePreference> {
        const formattedPayload = {
            userId: data.userId,
            minAge: data.prefMinAge,
            maxAge: data.prefMaxAge,
            minHeight: data.prefMinHeight,
            maxHeight: data.prefMaxHeight,
            religion: data.prefReligion,
            diet: data.prefDiet,
            drinkingHabits: data.prefDrinking,
            smokingHabits: data.prefSmoking,
        }
        return this.profilePreferenceRepository.create(formattedPayload as Partial<ProfilePreference>);
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
