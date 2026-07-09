import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { MetroStationsService } from "../services/metro_stations.service";
import { CreateMetroStationDto } from "../dto/create_metro_station.dto";

@ApiTags('metro-stations')
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller('/masterlist/metro-stations')
export class MetroStationsController {
    constructor(
        private readonly metroStationsService: MetroStationsService,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create a metro station' })
    create(@Body() dto: CreateMetroStationDto[]) {
        return this.metroStationsService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all metro stations, with optional search or line filter' })
    @ApiQuery({ name: 'search', required: false, description: 'Search by name or place or line' })
    @ApiQuery({ name: 'place', required: false, description: 'Search by place' })
    @ApiQuery({ name: 'line', required: false, description: 'Filter by metro line' })
    findAll(@Query('search') search?: string, @Query('place') place?: string, @Query('line') line?: string) {
        return this.metroStationsService.findAll(search, place, line);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a metro station by id' })
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.metroStationsService.findById(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a metro station by id' })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: Partial<CreateMetroStationDto>,
    ) {
        return this.metroStationsService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a metro station by id' })
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.metroStationsService.delete(id);
    }
}
