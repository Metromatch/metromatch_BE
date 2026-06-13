import { Injectable } from '@nestjs/common';
import { ProfileRepository } from '../repositories/profile.repository';
import { Profile } from '../entities/profils.entity';

@Injectable()
export class ProfileService {
    constructor(private readonly profileRepository: ProfileRepository) {}

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
        return this.profileRepository.updateById(id, data);
    }

    async findWithPagination(page: number, limit: number): Promise<[Profile[], number]> {
        const skip = (page - 1) * limit;
        return this.profileRepository.findWithPagination(skip, limit);
    }
}
