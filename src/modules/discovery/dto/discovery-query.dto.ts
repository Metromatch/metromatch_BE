import { IsNumber, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class DiscoveryQueryDto {
    @ApiPropertyOptional({ example: 500, description: 'Search radius in metres' })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(50)
    @Max(10000)
    radius?: number = 500;

    @ApiPropertyOptional({ example: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({ example: 20 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @Max(100)
    limit?: number = 20;
}
