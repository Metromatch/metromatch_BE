import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProfilePhoto } from "../entities/profile_photos.entity";

@Injectable()
export class ProfilePhotoRepository {
    constructor(
        @InjectRepository(ProfilePhoto)
        private readonly repository: Repository<ProfilePhoto>,
    ) { }

    async create(data: Partial<ProfilePhoto>): Promise<ProfilePhoto> {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }

    async findById(id: string): Promise<ProfilePhoto | null> {
        return this.repository.findOne({ where: { id } });
    }

    async findByUserId(userId: string): Promise<ProfilePhoto[]> {
        return this.repository.find({ where: { userId } });
    }

    async updateById(id: string, data: Partial<ProfilePhoto>): Promise<any> {
        return this.repository.update({ id }, data);
    }
}
