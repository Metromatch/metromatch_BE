import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Profile } from "../entities/profils.entity";
import { ProfilePhoto } from "../entities/profile_photos.entity";

@Injectable()
export class ProfileRepository {
    constructor(
        @InjectRepository(Profile)
        private readonly repository: Repository<Profile>,
    ) { }

    async create(data: Partial<Profile>): Promise<Profile> {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }

    async findById(id: string): Promise<Profile | null> {
        return this.repository.findOne({ where: { id } });
    }

    async findByUserId(userId: string): Promise<Profile | null> {
        return this.repository.findOne({ where: { userId } });
    }

    async updateById(id: string, data: Partial<Profile>): Promise<any> {
        return this.repository.update({ id }, data);
    }

    async updateByUserId(userId: string, data: Partial<Profile>): Promise<any> {
        return this.repository.update({ userId }, data);
    }

    async findProfilesWithPhotos(skip: number, take: number): Promise<[Profile[], number]> {
        return this.repository.createQueryBuilder('profile')
            .leftJoinAndMapMany(
                'profile.photos',
                ProfilePhoto,
                'photo',
                'photo.userId = profile.userId'
            )
            .orderBy('profile.createdAt', 'DESC')
            .skip(skip)
            .take(take)
            .getManyAndCount();
    }
}
