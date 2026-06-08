import { Injectable } from "@nestjs/common"
import dayjs from "dayjs"
import { UserSessionRepository } from "../repositories/user_session.repository"
import { UserSessionEntity } from "../entities/user_session.entity";

@Injectable()
export class UserSessionService {
    constructor(
        private readonly sessionRepo: UserSessionRepository,
    ) { }

    // async getSessionByUserId(userId: string) {
    //     return this.sessionRepo.findByUserId(userId)
    // }

    // finde by userId or deviceId
    async findSessionByUserIdOrDeviceId(userId: string, deviceId: string) {
        return this.sessionRepo.findByUserIdOrDeviceId(userId, deviceId)
    }
    async updateSession(id: string, data: Partial<UserSessionEntity>) {
        await this.sessionRepo.updateById(id, data);
        return this.sessionRepo.findById(id)
    }
    async createSession({ userId, refreshTokenHash, deviceId, accessTokenHash }: { userId: string, refreshTokenHash: string, deviceId?: string, accessTokenHash: string }) {
        return this.sessionRepo.create({
            userId,
            deviceId,
            refreshTokenHash,
            refreshTokenExpiresAt: dayjs()
                .add(30, 'days')
                .toDate(),
            accessTokenHash,
            accessTokenExpiresAt: dayjs()
                .add(2, 'hours')
                .toDate(),
        })
    }
}

