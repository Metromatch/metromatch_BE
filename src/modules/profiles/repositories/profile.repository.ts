import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Profile } from "../entities/profils.entity";

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

    async findWithPagination(skip: number, take: number): Promise<[Profile[], number]> {
        return this.repository.findAndCount({
            skip,
            take,
            order: { createdAt: 'DESC' }
        });
    }
}
