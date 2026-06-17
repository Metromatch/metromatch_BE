import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../../users/repositories/users.repository";
import { UserEntity } from "../../users/entities/users.entity";
import { ICreateUserPayload } from "../interfaces/user.interface";

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
    ) { }

    getByEmail(email: string): Promise<UserEntity | null> {
        return this.usersRepository.findByEmail(email)
    }
    getByPhone(phone: string): Promise<UserEntity | null> {
        return this.usersRepository.findByPhone(phone)
    }
    async createUser(data: ICreateUserPayload): Promise<UserEntity> {
        const existingUser = await this.getByEmail(data.email)
        if (existingUser) {
            throw new Error('User already exists')
        }
        return this.usersRepository.create(data);
    }

    async markOnboardingCompleted(userId: string): Promise<any> {
        return this.usersRepository.updateById(userId, { onboardingCompleted: true });
    }
}