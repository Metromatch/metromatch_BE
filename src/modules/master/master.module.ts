import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MasterlistController } from "./controllers/masterlist.controller";
import { MasterlistService } from "./services/masterlist.service";
import { CommonHelper } from "../../common/helpers/common";
import { MetroStationsEntity } from "./entities/metro_stations";
import { MetroStationsRepository } from "./repositories/metro_stations.repository";
import { MetroStationsService } from "./services/metro_stations.service";
import { MetroStationsController } from "./controllers/metro_stations.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([MetroStationsEntity]),
    ],
    controllers: [MasterlistController, MetroStationsController],
    providers: [MasterlistService, CommonHelper, MetroStationsRepository, MetroStationsService],
    exports: [MasterlistService, MetroStationsService],
})
export class MasterModule { }