import { DietEnum, DrinkingHabitsEnum, HeightEnum, GenderEnum, InterestedInEnum, RelationshipPreferenceEnum, ReligionEnum, SmokingHabitsEnum, TravelFrequencyEnum, TravelTimeRangeEnum } from "../enums/common_enums"

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
    [DietEnum.NON_VEGETARIAN]: 'Non-Veg',
    [DietEnum.EGGATARIAN]: 'Eggatarian',
    [DietEnum.VEGAN]: 'Vegan',
    [DietEnum.OTHER]: 'Other',
}

const DrinkingHabitsLabel = {
    [DrinkingHabitsEnum.YES]: 'Yes',
    [DrinkingHabitsEnum.NO]: 'No',
    [DrinkingHabitsEnum.OCCASIONAL]: 'Occasional',
}

const SmokingHabitsLabel = {
    [SmokingHabitsEnum.YES]: 'Yes',
    [SmokingHabitsEnum.NO]: 'No',
    [SmokingHabitsEnum.OCCASIONAL]: 'Occasional',
}

const TravelFrequencyLabel = {
    [TravelFrequencyEnum.DAILY_COMMUTER]: 'Daily commuter',
    [TravelFrequencyEnum.FEW_TIMES_A_WEEK]: 'Few times a week',
    [TravelFrequencyEnum.OCCASIONALLY]: 'Occasional',
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

const HeightLabel = {
    [HeightEnum.FOUR_FOOT_TEN]: "4'10'",
    [HeightEnum.FOUR_FOOT_ELEVEN]: "4'11'",
    [HeightEnum.FIVE_FOOT_0]: "5'0'",
    [HeightEnum.FIVE_FOOT_1]: "5'1'",
    [HeightEnum.FIVE_FOOT_2]: "5'2'",
    [HeightEnum.FIVE_FOOT_3]: "5'3'",
    [HeightEnum.FIVE_FOOT_4]: "5'4'",
    [HeightEnum.FIVE_FOOT_5]: "5'5'",
    [HeightEnum.FIVE_FOOT_6]: "5'6'",
    [HeightEnum.FIVE_FOOT_7]: "5'7'",
    [HeightEnum.FIVE_FOOT_8]: "5'8'",
    [HeightEnum.FIVE_FOOT_9]: "5'9'",
    [HeightEnum.FIVE_FOOT_10]: "5'10'",
    [HeightEnum.FIVE_FOOT_11]: "5'11'",
    [HeightEnum.SIX_FOOT_0]: "6'0'",
    [HeightEnum.SIX_FOOT_1]: "6'1'",
    [HeightEnum.SIX_FOOT_2]: "6'2'",
    [HeightEnum.SIX_FOOT_3]: "6'3'",
    [HeightEnum.SIX_FOOT_4]: "6'4'",
    [HeightEnum.SIX_FOOT_5]: "6'5'",
    [HeightEnum.SIX_FOOT_6]: "6'6'",
    [HeightEnum.SIX_FOOT_7]: "6'7'",
    [HeightEnum.SIX_FOOT_8]: "6'8'",
    [HeightEnum.SIX_FOOT_9]: "6'9'",
    [HeightEnum.SIX_FOOT_10]: "6'10'",
    [HeightEnum.SIX_FOOT_11]: "6'11'",
    [HeightEnum.SEVEN_FOOT_0]: "7'0'",
    [HeightEnum.SEVEN_PLUS]: "7'+'",
}

export { GenderLabel, ReligionLabel, DietLabel, DrinkingHabitsLabel, SmokingHabitsLabel, TravelFrequencyLabel, InterestedInLabel, RelationshipPreferenceLabel, TravelTimeRangeLabel, HeightLabel }