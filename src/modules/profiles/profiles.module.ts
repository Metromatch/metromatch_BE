import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Profile } from './entities/profiles.entity';
import { ProfilePreference } from './entities/profile_preferences.entity';
import { ProfilePhoto } from './entities/profile_photos.entity';

import { ProfileRepository } from './repositories/profile.repository';
import { ProfilePreferenceRepository } from './repositories/profile_preferences.repository';
import { ProfilePhotoRepository } from './repositories/profile_photos.repository';

import { ProfileService } from './services/profile.service';
import { ProfilePreferenceService } from './services/profile_preferences.service';
import { ProfilePhotoService } from './services/profile_photos.service';

import { ProfilesController } from './controllers/profiles.controller';

import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Profile, ProfilePreference, ProfilePhoto]),
        AuthModule,
    ],
    controllers: [ProfilesController],
    providers: [
        ProfileRepository,
        ProfilePreferenceRepository,
        ProfilePhotoRepository,
        ProfileService,
        ProfilePreferenceService,
        ProfilePhotoService,
    ],
    exports: [
        ProfileService,
        ProfilePreferenceService,
        ProfilePhotoService,
    ]
})
export class ProfilesModule { }
