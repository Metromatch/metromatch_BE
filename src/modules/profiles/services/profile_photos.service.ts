import { Injectable } from '@nestjs/common';
import { ProfilePhotoRepository } from '../repositories/profile_photos.repository';
import { ProfilePhoto } from '../entities/profile_photos.entity';

@Injectable()
export class ProfilePhotoService {
    constructor(private readonly profilePhotoRepository: ProfilePhotoRepository) {}

    async create(data: Partial<ProfilePhoto>): Promise<ProfilePhoto> {
        return this.profilePhotoRepository.create(data);
    }

    async findById(id: string): Promise<ProfilePhoto | null> {
        return this.profilePhotoRepository.findById(id);
    }

    async findByUserId(userId: string): Promise<ProfilePhoto[]> {
        return this.profilePhotoRepository.findByUserId(userId);
    }

    async updateById(id: string, data: Partial<ProfilePhoto>): Promise<any> {
        return this.profilePhotoRepository.updateById(id, data);
    }

    async findByUserIds(userIds: string[]): Promise<ProfilePhoto[]> {
        return this.profilePhotoRepository.findByUserIds(userIds);
    }
}
