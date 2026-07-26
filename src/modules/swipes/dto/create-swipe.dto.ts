import { IsEnum, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SwipeType } from '../entities/swipe.entity';

export class CreateSwipeDto {
    @ApiProperty({ example: 'uuid-of-target-profile' })
    @IsUUID()
    toProfileId: string;

    @ApiProperty({ enum: SwipeType, example: SwipeType.LIKE })
    @IsEnum(SwipeType)
    swipeType: SwipeType;
}
