import { Module } from "@nestjs/common";
import { MasterlistController } from "./controllers/masterlist.controller";
import { MasterlistService } from "./services/masterlist.service";
import { CommonHelper } from "src/common/helpers/common";

@Module({
    imports: [],
    controllers: [MasterlistController],
    providers: [MasterlistService, CommonHelper],
    exports: [MasterlistService],
})
export class MasterModule { }