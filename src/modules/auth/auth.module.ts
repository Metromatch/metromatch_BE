import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { UsersService } from '../users/services/users.service';
import { UserSessionService } from './services/user_session.service';
import { UsersRepository } from '../users/repositories/users.repository';
import { UserSessionRepository } from './repositories/user_session.repository';
import { UserEntity } from '../users/entities/users.entity';
import { UserSessionEntity } from './entities/user_session.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, UserSessionEntity]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (
                configService: ConfigService,
            ) => ({
                secret: configService.get('JWT_SECRET'),
            }),
        })
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        TokenService,
        UsersService,
        UserSessionService,
        UsersRepository,
        UserSessionRepository,
        JwtStrategy,
    ],
    exports: [PassportModule, JwtStrategy],
})
export class AuthModule { }