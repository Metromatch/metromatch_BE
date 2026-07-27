import {
    Controller,
    Post,
    Body,
    Request,
    UseGuards,
    UnauthorizedException,
    Delete,
    Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FavoriteService } from '../services/favorites.service';
import { FavoriteDto } from '../dto/favorites.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { getProfileIdFromRequest } from 'src/common/helpers/common';

@ApiTags('favorites')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
    constructor(private readonly favoriteService: FavoriteService) { }

    @Post()
    async markFavorite(@Request() req: any, @Body() dto: FavoriteDto) {
        const profileId = getProfileIdFromRequest(req)
        if (!profileId) throw new UnauthorizedException();
        return this.favoriteService.markFavorite(profileId, dto);
    }

    //params

    @Delete(':id')
    async removeFavorite(@Request() req: any, @Param() id: string) {
        const profileId = getProfileIdFromRequest(req)
        if (!profileId) throw new UnauthorizedException();
        return this.favoriteService.removeFavorite(profileId, id);
    }

}
