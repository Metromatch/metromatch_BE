import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ChatTokenEntity } from "../entities/chat_token.entity";

@Injectable()
export class ChatTokenRepository {
    constructor(
        @InjectRepository(ChatTokenEntity)
        private readonly chatTokenRepository: Repository<ChatTokenEntity>,
    ) { }

    async create(data: Partial<ChatTokenEntity>): Promise<ChatTokenEntity> {
        const chatToken = this.chatTokenRepository.create(data);
        return this.chatTokenRepository.save(chatToken);
    }

    async findByUserId(userId: string): Promise<ChatTokenEntity | null> {
        return this.chatTokenRepository.findOne({ where: { userId } });
    }

}