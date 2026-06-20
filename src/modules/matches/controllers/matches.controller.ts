import {
    Controller,
    Get,
    Delete,
    Param,
    Request,
    UseGuards,
    UnauthorizedException,
    ParseUUIDPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MatchService } from '../services/match.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('matches')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('matches')
export class MatchesController {
    constructor(private readonly matchService: MatchService) {}

    /** List all active matches for the calling user */
    @Get()
    async getMatches(@Request() req: any) {
        const userId = req.user?.sub || req.user?.userId;
        if (!userId) throw new UnauthorizedException();
        return this.matchService.getMatches(userId);
    }

    /** Get a specific match by ID */
    @Get(':id')
    async getMatch(
        @Request() req: any,
        @Param('id', ParseUUIDPipe) id: string,
    ) {
        const userId = req.user?.sub || req.user?.userId;
        if (!userId) throw new UnauthorizedException();
        return this.matchService.getMatchById(id);
    }

    /** Unmatch (soft-delete) a match */
    @Delete(':id')
    async unmatch(
        @Request() req: any,
        @Param('id', ParseUUIDPipe) id: string,
    ) {
        const userId = req.user?.sub || req.user?.userId;
        if (!userId) throw new UnauthorizedException();
        return this.matchService.unmatch(userId, id);
    }
}
