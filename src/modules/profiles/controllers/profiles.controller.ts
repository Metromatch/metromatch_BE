import { Controller, Get, Post, Put, Body, Query, Request, UnauthorizedException, UseGuards, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProfileService } from '../services/profile.service';
import { ProfilePreferenceService } from '../services/profile_preferences.service';
import { ProfilePhotoService } from '../services/profile_photos.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PaginationQueryDto } from '../dto/pagination-query.dto';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';

@ApiTags('profiles')
@Controller('profiles')
export class ProfilesController {
    constructor(
        private readonly profileService: ProfileService,
        private readonly profilePreferenceService: ProfilePreferenceService,
        private readonly profilePhotoService: ProfilePhotoService,
    ) { }

    @Get()
    async getProfiles(
        @Query() query: PaginationQueryDto,
    ) {
        const page = query.page || 1;
        const limit = query.limit || 10;

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

    @ApiBearerAuth()
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

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('me')
    async createProfile(@Request() req: any, @Body() body: CreateProfileDto) {
        const userId = req.user?.sub || req.user?.userId;
        if (!userId) {
            throw new UnauthorizedException('User not authenticated');
        }

        const [profile, preferences, photos] = await Promise.all([
            this.profileService.create({
                ...body,
                userId,
            }),
            this.profilePreferenceService.create({
                ...body,
                userId,
            }),
            this.profilePhotoService.create({
                ...body,
                userId,
            })
        ])
        return {
            profile,
            preferences,
            photos,
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put('me')
    async updateProfile(@Request() req: any, @Body() body: UpdateProfileDto) {
        const userId = req.user?.sub || req.user?.userId;
        if (!userId) {
            throw new UnauthorizedException('User not authenticated');
        }

        return this.profileService.updateByUserId(userId, body);
    }

    //delete profile
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete('me')
    async deleteProfile(@Request() req: any) {
        const userId = req.user?.sub || req.user?.userId;
        if (!userId) {
            throw new UnauthorizedException('User not authenticated');
        }

        return this.profileService.deleteByUserId(userId);
    }
}
