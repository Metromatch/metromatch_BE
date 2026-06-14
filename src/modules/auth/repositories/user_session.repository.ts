import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserSessionEntity } from "../entities/user_session.entity";
import { Repository } from "typeorm";
import { LoginDto } from "../dto/login.dto";

@Injectable()
export class UserSessionRepository {
    constructor(
        @InjectRepository(UserSessionEntity)
        private readonly userSessionRepository: Repository<UserSessionEntity>,
    ) { }

    async create(data: Partial<UserSessionEntity>): Promise<UserSessionEntity> {
        const userSession = this.userSessionRepository.create(data);
        return this.userSessionRepository.save(userSession);
    }

    async findById(id: string): Promise<UserSessionEntity | null> {
        return this.userSessionRepository.findOne({ where: { id } });
    }

    async findByUserIdOrDeviceId(userId: string, deviceId?: string | null): Promise<UserSessionEntity | null> {
        if (!deviceId) {
            return this.userSessionRepository.findOne({ where: { userId } });
        }
        return this.userSessionRepository.findOne({ where: [{ userId }, { deviceId }] });
    }

    async findByUserId(userId: string): Promise<UserSessionEntity | null> {
        return this.userSessionRepository.findOne({ where: { userId } });
    }

    async findByDeviceId(deviceId: string): Promise<UserSessionEntity | null> {
        return this.userSessionRepository.findOne({ where: { deviceId } });
    }

    async updateById(id: string, data: Partial<UserSessionEntity>): Promise<any> {
        return this.userSessionRepository.update({ id }, data);
    }
}