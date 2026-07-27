import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {

    @ApiProperty({ example: 'uuid-of-target-profile' })
    @IsUUID()
    planId: string;

}