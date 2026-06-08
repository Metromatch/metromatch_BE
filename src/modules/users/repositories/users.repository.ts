import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/users.entity";
import { Repository } from "typeorm";
import { SignupDto } from "../../auth/dto/signup.dto";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
    ) { }

    async create(data: { email: string, phone: string, passwordHash: string }): Promise<UserEntity> {
        const user = this.usersRepository.create(data);
        return this.usersRepository.save(user);
    }

    async findById(id: string): Promise<UserEntity | null> {
        return this.usersRepository.findOne({ where: { id } });
    }

    async updateById(id: string, data: Partial<UserEntity>): Promise<any> {
        return this.usersRepository.update({ id }, data);
        // return this.findById(id);
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async findByPhone(phone: string): Promise<UserEntity | null> {
        return this.usersRepository.findOne({ where: { phone } });
    }
}