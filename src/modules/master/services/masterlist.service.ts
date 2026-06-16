import { Injectable } from "@nestjs/common";
import { CommonHelper } from "../../../common/helpers/common";
import { GenderEnum, ReligionEnum, DietEnum, DrinkingHabitsEnum, SmokingHabitsEnum, TravelFrequencyEnum, InterestedInEnum, RelationshipPreferenceEnum, TravelTimeRangeEnum, HeightEnum } from "../../../common/enums/common_enums";
import { GenderLabel, ReligionLabel, DietLabel, DrinkingHabitsLabel, SmokingHabitsLabel, TravelFrequencyLabel, InterestedInLabel, RelationshipPreferenceLabel, TravelTimeRangeLabel, HeightLabel } from "../../../common/constants/enum_labels";
import { IMasterListEnumKeys } from "../master.interface";
import { DietConfig } from "../../../common/constants/enum_option_config";

@Injectable()
export class MasterlistService {
    constructor(
        private readonly commonHelper: CommonHelper,
    ) { }

    getGenderList() {
        return this.commonHelper.getOptions(GenderEnum, GenderLabel);
    }

    getReligionList() {
        return this.commonHelper.getOptions(ReligionEnum, ReligionLabel);
    }

    getDietList() {
        return this.commonHelper.getOptions(DietEnum, DietLabel, DietConfig);
    }

    getDrinkingHabitsList() {
        return this.commonHelper.getOptions(DrinkingHabitsEnum, DrinkingHabitsLabel);
    }

    getSmokingHabitsList() {
        return this.commonHelper.getOptions(SmokingHabitsEnum, SmokingHabitsLabel);
    }

    getTravelFrequencyList() {
        return this.commonHelper.getOptions(TravelFrequencyEnum, TravelFrequencyLabel);
    }

    getInterestedInList() {
        return this.commonHelper.getOptions(InterestedInEnum, InterestedInLabel);
    }

    getRelationshipPreferenceList() {
        return this.commonHelper.getOptions(RelationshipPreferenceEnum, RelationshipPreferenceLabel);
    }

    getTravelTimeRangeList() {
        return this.commonHelper.getOptions(TravelTimeRangeEnum, TravelTimeRangeLabel);
    }

    getHeightList() {
        return this.commonHelper.getOptions(HeightEnum, HeightLabel);
    }

    getMasterList(key: keyof IMasterListEnumKeys) {
        switch (key) {
            case 'gender':
                return this.getGenderList();
            case 'religion':
                return this.getReligionList();
            case 'diet':
                return this.getDietList();
            case 'drinkingHabits':
                return this.getDrinkingHabitsList();
            case 'smokingHabits':
                return this.getSmokingHabitsList();
            case 'travelFrequency':
                return this.getTravelFrequencyList();
            case 'interestedIn':
                return this.getInterestedInList();
            case 'relationshipPreference':
                return this.getRelationshipPreferenceList();
            case 'travelTimeRange':
                return this.getTravelTimeRangeList();
            case 'height':
                return this.getHeightList();
            default:
                return [];
        }
    }
}