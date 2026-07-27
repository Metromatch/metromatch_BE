import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { Favorite } from '../entities/payments.entity';

@Injectable()
export class FavoriteRepository {
    // constructor(
    //     @InjectRepository(Favorite)
    //     private readonly repository: Repository<Favorite>,
    // ) { }

    // async create(data: Partial<Favorite>): Promise<Favorite> {
    //     const entity = this.repository.create(data);
    //     return this.repository.save(entity);
    // }

    // async delete(fromProfileId: string, toProfileId: string): Promise<void> {
    //     await this.repository.delete({ fromProfileId, toProfileId });
    // }

}
