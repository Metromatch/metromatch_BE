import { Controller, Get, Query, Request, UnauthorizedException } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { ProfilePreferenceService } from '../services/profile_preferences.service';
import { ProfilePhotoService } from '../services/profile_photos.service';

@Controller('profiles')
export class ProfilesController {
    constructor(
        private readonly profileService: ProfileService,
        private readonly profilePreferenceService: ProfilePreferenceService,
        private readonly profilePhotoService: ProfilePhotoService,
    ) {}

    @Get()
    async getProfiles(
        @Query('page') pageStr: string,
        @Query('limit') limitStr: string,
    ) {
        const page = parseInt(pageStr, 10) || 1;
        const limit = parseInt(limitStr, 10) || 10;
        
        const [profiles, total] = await this.profileService.findWithPagination(page, limit);
        
        const userIds = profiles.map(p => p.userId);
        const photos = userIds.length > 0 
            ? await this.profilePhotoService.findByUserIds(userIds)
            : [];
        
        const photosByUserId = photos.reduce((acc: any, photo) => {
            if (!acc[photo.userId]) {
                acc[photo.userId] = [];
            }
            acc[photo.userId].push(photo);
            return acc;
        }, {});
        
        const items = profiles.map(profile => ({
            ...profile,
            photos: photosByUserId[profile.userId] || [],
        }));
        
        return {
            data: items,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            }
        };
    }

    @Get('me')
    async getMe(@Request() req: any) {
        const userId = req.user?.sub || req.user?.userId;
        if (!userId) {
            throw new UnauthorizedException('User not authenticated or missing user in request object');
        }
        
        const profile = await this.profileService.findByUserId(userId);
        const preferences = await this.profilePreferenceService.findByUserId(userId);
        const photos = await this.profilePhotoService.findByUserId(userId);
        
        return {
            profile,
            preferences,
            photos,
        };
    }
}
