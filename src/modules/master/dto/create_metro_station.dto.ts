import { IsNotEmpty, IsString } from "class-validator";

export class CreateMetroStationDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    line: string

    @IsNotEmpty()
    @IsString()
    place: string
}