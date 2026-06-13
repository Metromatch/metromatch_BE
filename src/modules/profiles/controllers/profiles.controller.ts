import { Controller, Get, Query, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { ProfilePreferenceService } from '../services/profile_preferences.service';
import { ProfilePhotoService } from '../services/profile_photos.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('profiles')
export class ProfilesController {
    constructor(
        private readonly profileService: ProfileService,
        private readonly profilePreferenceService: ProfilePreferenceService,
        private readonly profilePhotoService: ProfilePhotoService,
    ) { }

    @Get()
    async getProfiles(
        @Query('page') pageStr: string,
        @Query('limit') limitStr: string,
    ) {
        const page = parseInt(pageStr, 10) || 1;
        const limit = parseInt(limitStr, 10) || 10;

        const [profiles, total] = await this.profileService.findProfilesWithPhotos(page, limit);

        return {
            data: profiles,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            }
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getMe(@Request() req: any) {
        const userId = req.user?.sub || req.user?.userId;
        if (!userId) {
            throw new UnauthorizedException('User not authenticated or missing user in request object');
        }

        const [profile, preferences, photos] = await Promise.all([
            this.profileService.findByUserId(userId),
            this.profilePreferenceService.findByUserId(userId),
            this.profilePhotoService.findByUserId(userId),
        ]);

        return {
            profile,
            preferences,
            photos,
        };
    }
}
