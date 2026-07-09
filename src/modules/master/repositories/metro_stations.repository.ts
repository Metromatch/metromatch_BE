import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike, FindOptionsWhere } from "typeorm";
import { MetroStationsEntity } from "../entities/metro_stations.js";
import { CreateMetroStationDto } from "../dto/create_metro_station.dto";
import { ICreateMetroStation } from "../interfaces/create_metro_station.interface.js";

@Injectable()
export class MetroStationsRepository {
    constructor(
        @InjectRepository(MetroStationsEntity)
        private readonly metroStationsRepository: Repository<MetroStationsEntity>,
    ) { }

    async create(data: ICreateMetroStation[]): Promise<MetroStationsEntity[]> {
        const stations = this.metroStationsRepository.create(data);
        return this.metroStationsRepository.save(stations);
    }

    async findAll(search?: string, place?: string, line?: string): Promise<MetroStationsEntity[]> {
        const where: FindOptionsWhere<MetroStationsEntity> = {};
        if (search) {
            where.name = ILike(`%${search}%`);
        }
        if (place) {
            where.place = ILike(`%${place}%`);
        }
        if (line) {
            where.line = ILike(`%${line}%`);
        }
        return this.metroStationsRepository.find({
            where,
            order: { name: 'ASC' }
        });
    }

    async findById(id: number): Promise<MetroStationsEntity | null> {
        return this.metroStationsRepository.findOne({ where: { id } });
    }

    async findByLine(line: string, search?: string): Promise<MetroStationsEntity[]> {
        //filter based on search also
        if (search) {
            return this.metroStationsRepository.find({ where: { line, name: ILike(`%${search}%`) }, order: { name: 'ASC' } });
        }
        return this.metroStationsRepository.find({ where: { line }, order: { name: 'ASC' } });
    }
    async findByPlace(place: string, search?: string): Promise<MetroStationsEntity[]> {
        if (search) {
            return this.metroStationsRepository.find({ where: { place, name: ILike(`%${search}%`) }, order: { name: 'ASC' } });
        }
        return this.metroStationsRepository.find({ where: { place }, order: { name: 'ASC' } });
    }
    async search(query: string): Promise<MetroStationsEntity[]> {
        return this.metroStationsRepository.find({
            where: [
                { name: ILike(`%${query}%`) },
                { place: ILike(`%${query}%`) },
                { line: ILike(`%${query}%`) },
            ],
            order: { name: 'ASC' },
        });
    }

    async updateById(id: number, data: Partial<MetroStationsEntity>): Promise<MetroStationsEntity> {
        await this.metroStationsRepository.update({ id }, data);
        return (await this.findById(id))!;
    }

    async deleteById(id: number): Promise<void> {
        await this.metroStationsRepository.delete({ id });
    }
}
