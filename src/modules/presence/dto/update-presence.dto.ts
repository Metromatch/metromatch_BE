import { IsBoolean, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePresenceDto {
    @ApiProperty({ example: 12.9716 })
    @IsNumber()
    @Min(-90)
    @Max(90)
    latitude: number;

    @ApiProperty({ example: 77.5946 })
    @IsNumber()
    @Min(-180)
    @Max(180)
    longitude: number;

    @ApiPropertyOptional({ example: true })
    @IsOptional()
    @IsBoolean()
    online?: boolean;
}
