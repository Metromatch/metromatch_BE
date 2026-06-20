import {
    Controller,
    Get,
    Query,
    Request,
    UseGuards,
    UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DiscoveryService } from '../services/discovery.service';
import { DiscoveryQueryDto } from '../dto/discovery-query.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('discovery')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('discovery')
export class DiscoveryController {
    constructor(private readonly discoveryService: DiscoveryService) {}

    /**
     * Returns nearby users (with profile data and distance) based on the
     * calling user's current presence location.
     */
    @Get()
    async discoverNearby(
        @Request() req: any,
        @Query() query: DiscoveryQueryDto,
    ) {
        const userId = req.user?.sub || req.user?.userId;
        if (!userId) throw new UnauthorizedException();
        return this.discoveryService.discoverNearby(userId, query);
    }
}
