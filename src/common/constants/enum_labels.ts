import { DietEnum, DrinkingHabitsEnum, GenderEnum, InterestedInEnum, RelationshipPreferenceEnum, ReligionEnum, SmokingHabitsEnum, TravelFrequencyEnum, TravelTimeRangeEnum } from "../enums/common_enums"

const GenderLabel = {
    [GenderEnum.MALE]: 'Male',
    [GenderEnum.FEMALE]: 'Female',
    [GenderEnum.OTHER]: 'Other',
}

const ReligionLabel = {
    [ReligionEnum.HINDU]: 'Hindu',
    [ReligionEnum.CHRISTIAN]: 'Christian',
    [ReligionEnum.MUSLIM]: 'Muslim',
    [ReligionEnum.SIKH]: 'Sikh',
    [ReligionEnum.JAIN]: 'Jain',
    [ReligionEnum.BUDDHIST]: 'Buddhist',
    [ReligionEnum.ATHEIST]: 'Atheist',
    [ReligionEnum.SPIRITUAL]: 'Spiritual',
    [ReligionEnum.OTHER]: 'Other',
    [ReligionEnum.PREFER_NOT_TO_SAY]: 'Prefer not to say',
}

const DietLabel = {
    [DietEnum.VEGETARIAN]: 'Vegetarian',
    [DietEnum.NON_VEGETARIAN]: 'Non-vegetarian',
    [DietEnum.EGGATARIAN]: 'Eggatarian',
    [DietEnum.VEGAN]: 'Vegan',
    [DietEnum.OTHER]: 'Other',
    [DietEnum.PREFER_NOT_TO_SAY]: 'Prefer not to say',
}

const DrinkingHabitsLabel = {
    [DrinkingHabitsEnum.YES]: 'Yes',
    [DrinkingHabitsEnum.NO]: 'No',
    [DrinkingHabitsEnum.OCCASIONAL]: 'Occasional',
    [DrinkingHabitsEnum.PREFER_NOT_TO_SAY]: 'Prefer not to say',
}

const SmokingHabitsLabel = {
    [SmokingHabitsEnum.YES]: 'Yes',
    [SmokingHabitsEnum.NO]: 'No',
    [SmokingHabitsEnum.OCCASIONAL]: 'Occasional',
    [SmokingHabitsEnum.PREFER_NOT_TO_SAY]: 'Prefer not to say',
}

const TravelFrequencyLabel = {
    [TravelFrequencyEnum.DAILY_COMMUTER]: 'Daily commuter',
    [TravelFrequencyEnum.FEW_TIMES_A_WEEK]: 'Few times a week',
    [TravelFrequencyEnum.OCCASIONALLY]: 'Occasionally',
}

const InterestedInLabel = {
    [InterestedInEnum.MEN]: 'Men',
    [InterestedInEnum.WOMEN]: 'Women',
    [InterestedInEnum.EVERYONE]: 'Everyone',
}

const RelationshipPreferenceLabel = {
    [RelationshipPreferenceEnum.SHORT_TERM]: 'Short term',
    [RelationshipPreferenceEnum.CASUAL_DATING]: 'Casual dating',
    [RelationshipPreferenceEnum.LETS_SEE]: 'Let\'s see',
}

const TravelTimeRangeLabel = {
    [TravelTimeRangeEnum['7-9 AM']]: '7-9 AM',
    [TravelTimeRangeEnum['9-12 PM']]: '9-12 PM',
    [TravelTimeRangeEnum['12-3 PM']]: '12-3 PM',
    [TravelTimeRangeEnum['3-6 PM']]: '3-6 PM',
    [TravelTimeRangeEnum['6-9 PM']]: '6-9 PM',
    [TravelTimeRangeEnum['After 9 PM']]: 'After 9 PM',
}



export { GenderLabel, ReligionLabel, DietLabel, DrinkingHabitsLabel, SmokingHabitsLabel, TravelFrequencyLabel, InterestedInLabel, RelationshipPreferenceLabel, TravelTimeRangeLabel }