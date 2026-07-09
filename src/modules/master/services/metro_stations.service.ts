import { Injectable, NotFoundException } from "@nestjs/common";
import { MetroStationsRepository } from "../repositories/metro_stations.repository";
import { CreateMetroStationDto } from "../dto/create_metro_station.dto";
import { MetroStationsEntity } from "../entities/metro_stations";

@Injectable()
export class MetroStationsService {
    constructor(
        private readonly metroStationsRepository: MetroStationsRepository,
    ) { }

    async create(dto: CreateMetroStationDto[]): Promise<MetroStationsEntity[]> {
        const data = dto.map(item => ({
            ...item,
            unique_name_and_place: `${item.name}_${item.place}`
        }));
        return this.metroStationsRepository.create(data);
    }

    async findAll(search?: string, place?: string, line?: string): Promise<MetroStationsEntity[]> {
        return this.metroStationsRepository.findAll(search, place, line);
    }

    async findById(id: number): Promise<MetroStationsEntity> {
        const station = await this.metroStationsRepository.findById(id);
        if (!station) {
            throw new NotFoundException(`Metro station with id ${id} not found`);
        }
        return station;
    }

    // async findByLine(line: string, search?: string): Promise<MetroStationsEntity[]> {
    //     return this.metroStationsRepository.findByLine(line, search);
    // }
    // async findByPlace(place: string, search?: string): Promise<MetroStationsEntity[]> {
    //     return this.metroStationsRepository.findByPlace(place, search);
    // }
    // async search(query: string): Promise<MetroStationsEntity[]> {
    //     return this.metroStationsRepository.search(query);
    // }

    async update(id: number, dto: Partial<CreateMetroStationDto>): Promise<MetroStationsEntity> {
        const station = await this.metroStationsRepository.findById(id);
        if (!station) {
            throw new NotFoundException(`Metro station with id ${id} not found`);
        }
        return this.metroStationsRepository.updateById(id, dto);
    }

    async delete(id: number): Promise<void> {
        const station = await this.metroStationsRepository.findById(id);
        if (!station) {
            throw new NotFoundException(`Metro station with id ${id} not found`);
        }
        return this.metroStationsRepository.deleteById(id);
    }
}
