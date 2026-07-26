import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileRepository } from '../repositories/profile.repository';
import { Profile } from '../entities/profiles.entity';

@Injectable()
export class ProfileService {
    constructor(private readonly profileRepository: ProfileRepository) { }

    async create(data: Partial<Profile>): Promise<Profile> {
        return this.profileRepository.create(data);
    }

    async findById(id: string): Promise<Profile | null> {
        return this.profileRepository.findById(id);
    }

    async findByUserId(userId: string): Promise<Profile | null> {
        return this.profileRepository.findByUserId(userId);
    }

    async updateById(id: string, data: Partial<Profile>): Promise<any> {
        const formattedPayload = {
            name: data.name,
            dob: data.dob,
            gender: data.gender,
            drinkingHabits: data.drinkingHabits,
            smokingHabits: data.smokingHabits,
            profession: data.profession,
            vibe: data.vibe,
            religion: data.religion,
            height: data.height,
            diet: data.diet,
            travelFrequency: data.travelFrequency,
            relationshipPreference: data.relationshipPreference,
            interestedIn: data.interestedIn,
            frequentMetroStation: data.frequentMetroStation,
            travelTimeSlots: data.travelTimeSlots,
        }
        return this.profileRepository.updateById(id, formattedPayload);
    }

    async updateByUserId(userId: string, data: Partial<Profile>): Promise<any> {
        const profile = await this.profileRepository.updateByUserId(userId, data);
        if (!profile) {
            throw new NotFoundException(`Profile with user ID ${userId} not found`);
        }
        return profile;
    }
    async deleteByUserId(userId: string): Promise<any> {
        const [profile] = await this.profileRepository.deleteByUserId(userId);
        if (!profile) {
            throw new NotFoundException(`Profile with user ID ${userId} not found`);
        }
        return profile;
    }
    async findProfilesWithPhotos(page: number, limit: number): Promise<[Profile[], number]> {
        const skip = (page - 1) * limit;
        return this.profileRepository.findProfilesWithPhotos(skip, limit);
    }
}
