import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';
import { IMasterListEnumKeys } from '../master.interface';

export class GetMasterlistDto {
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    keys: (keyof IMasterListEnumKeys)[];
}
