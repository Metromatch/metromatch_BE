import {
    Controller,
    Get,
    Param,
    Request,
    UseGuards,
    UnauthorizedException,
    ParseUUIDPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EncounterService } from '../services/encounter.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('encounters')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('encounters')
export class EncountersController {
    constructor(private readonly encounterService: EncounterService) {}

    /** List all proximity encounters for the calling user */
    @Get()
    async getEncounters(@Request() req: any) {
        const userId = req.user?.sub || req.user?.userId;
        if (!userId) throw new UnauthorizedException();
        return this.encounterService.getEncounters(userId);
    }

    /** Encounter details between the calling user and another specific user */
    @Get(':userId')
    async getEncounterWithUser(
        @Request() req: any,
        @Param('userId', ParseUUIDPipe) otherUserId: string,
    ) {
        const userId = req.user?.sub || req.user?.userId;
        if (!userId) throw new UnauthorizedException();
        return this.encounterService.getEncounterWithUser(userId, otherUserId);
    }
}
