import { BadRequestException, Body, Controller, Get, Post } from "@nestjs/common";
import { MasterlistService } from "../services/masterlist.service";
import { IMasterListEnumKeys } from "../master.interface";

@Controller('/masterlist')
export class MasterlistController {
    constructor(
        private readonly masterlistService: MasterlistService,
    ) { }

    @Post()
    getAllMasterLists(@Body() data: { keys: (keyof IMasterListEnumKeys)[] }) {

        const { keys } = data;
        const result = {}
        try {
            keys.forEach(key => {
                if (key) {
                    result[key] = this.masterlistService.getMasterList(key);
                } else {
                    throw new Error('Invalid key(s)');
                }
            });
        } catch (error) {
            throw new BadRequestException(error.message);
        }
        return result;
    }

    @Get('gender')
    getGenderList() {
        return this.masterlistService.getGenderList();
    }
    @Get('religion')
    getReligionList() {
        return this.masterlistService.getReligionList();
    }
    @Get('diet')
    getDietList() {
        return this.masterlistService.getDietList();
    }
    @Get('drinking-habits')
    getDrinkingHabitsList() {
        return this.masterlistService.getDrinkingHabitsList();
    }
    @Get('smoking-habits')
    getSmokingHabitsList() {
        return this.masterlistService.getSmokingHabitsList();
    }
    @Get('travel-frequency')
    getTravelFrequencyList() {
        return this.masterlistService.getTravelFrequencyList();
    }
    @Get('interested-in')
    getInterestedInList() {
        return this.masterlistService.getInterestedInList();
    }
    @Get('relationship-preference')
    getRelationshipPreferenceList() {
        return this.masterlistService.getRelationshipPreferenceList();
    }

}