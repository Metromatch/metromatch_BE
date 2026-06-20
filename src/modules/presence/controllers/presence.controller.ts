import {
    Controller,
    Put,
    Delete,
    Get,
    Body,
    Query,
    Request,
    UseGuards,
    UnauthorizedException,
    ParseIntPipe,
    DefaultValuePipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PresenceService } from '../services/presence.service';
import { UpdatePresenceDto } from '../dto/update-presence.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('presence')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('presence')
export class PresenceController {
    constructor(private readonly presenceService: PresenceService) {}

    /** Update (or create) the calling user's location & online status */
    @Put()
    async updatePresence(
        @Request() req: any,
        @Body() dto: UpdatePresenceDto,
    ) {
        const userId = req.user?.sub || req.user?.userId;
        if (!userId) throw new UnauthorizedException();
        return this.presenceService.updatePresence(userId, dto);
    }

    /** Mark the calling user as offline */
    @Delete()
    async setOffline(@Request() req: any) {
        const userId = req.user?.sub || req.user?.userId;
        if (!userId) throw new UnauthorizedException();
        await this.presenceService.setOffline(userId);
        return { success: true };
    }

    /** Get the calling user's own presence record */
    @Get('me')
    async getMyPresence(@Request() req: any) {
        const userId = req.user?.sub || req.user?.userId;
        if (!userId) throw new UnauthorizedException();
        return this.presenceService.getPresence(userId);
    }

    /** Get other online users within a given radius (metres) */
    @ApiQuery({ name: 'radius', required: false, example: 500 })
    @ApiQuery({ name: 'limit', required: false, example: 50 })
    @Get('nearby')
    async getNearby(
        @Request() req: any,
        @Query('radius', new DefaultValuePipe(500), ParseIntPipe) radius: number,
        @Query('limit', new DefaultValuePipe(50), ParseIntPipe) limit: number,
    ) {
        const userId = req.user?.sub || req.user?.userId;
        if (!userId) throw new UnauthorizedException();

        const me = await this.presenceService.getPresence(userId);
        if (!me || me.latitude == null || me.longitude == null) {
            return { data: [], message: 'Update your location first' };
        }

        const nearby = await this.presenceService.getNearby(
            userId,
            Number(me.latitude),
            Number(me.longitude),
            radius,
            limit,
        );
        return { data: nearby };
    }
}
