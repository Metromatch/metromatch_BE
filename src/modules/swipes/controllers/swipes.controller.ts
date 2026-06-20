import {
    Controller,
    Post,
    Get,
    Body,
    Request,
    UseGuards,
    UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SwipeService } from '../services/swipe.service';
import { CreateSwipeDto } from '../dto/create-swipe.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('swipes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('swipes')
export class SwipesController {
    constructor(private readonly swipeService: SwipeService) {}

    /**
     * Create or update a swipe.
     * If both users have liked each other, returns matched: true and the matchId.
     */
    @Post()
    async swipe(@Request() req: any, @Body() dto: CreateSwipeDto) {
        const userId = req.user?.sub || req.user?.userId;
        if (!userId) throw new UnauthorizedException();
        return this.swipeService.swipe(userId, dto);
    }

    /** Swipes the calling user has sent */
    @Get('sent')
    async getSent(@Request() req: any) {
        const userId = req.user?.sub || req.user?.userId;
        if (!userId) throw new UnauthorizedException();
        return this.swipeService.getSwipesSent(userId);
    }

    /** Swipes the calling user has received */
    @Get('received')
    async getReceived(@Request() req: any) {
        const userId = req.user?.sub || req.user?.userId;
        if (!userId) throw new UnauthorizedException();
        return this.swipeService.getSwipesReceived(userId);
    }
}
