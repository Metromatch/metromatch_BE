import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FavoriteDto {
    @ApiProperty({ example: 'uuid-of-target-profile' })
    @IsUUID()
    profileId: string;

}
