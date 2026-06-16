import { IsString, IsOptional, IsDateString, IsNumber, IsArray, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { DietEnum, DrinkingHabitsEnum, GenderEnum, HeightEnum, RelationshipPreferenceEnum, ReligionEnum, SmokingHabitsEnum, TravelFrequencyEnum } from 'src/common/enums/common_enums';

export class CreateProfileDto {
    @ApiPropertyOptional()
    @IsString()
    name: string;

    @ApiPropertyOptional()
    @IsDateString()
    dob: string;

    @ApiPropertyOptional()
    @IsEnum(GenderEnum)
    gender?: GenderEnum;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(DrinkingHabitsEnum)
    drinkingHabits?: DrinkingHabitsEnum;


    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(SmokingHabitsEnum)
    smokingHabits?: SmokingHabitsEnum;


    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(ReligionEnum)
    religion?: ReligionEnum;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(HeightEnum)
    height?: HeightEnum;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(DietEnum)
    diet?: DietEnum;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(TravelFrequencyEnum)
    travelFrequency?: TravelFrequencyEnum;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(RelationshipPreferenceEnum)
    relationshipPreference?: RelationshipPreferenceEnum;

    @ApiPropertyOptional({ type: [String] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    travelTimeSlots?: string[];
}   
