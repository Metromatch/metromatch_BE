import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './modules/users/entities/users.entity';
import { UserSessionEntity } from './modules/auth/entities/user_session.entity';
import { AuthModule } from './modules/auth/auth.module';
import { MasterModule } from './modules/master/master.module';
import { ProfilesModule } from './modules/profiles/profiles.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: process.env.NODE_ENV !== 'production'
          ? {
              targets: [
                { target: 'pino-pretty', options: { colorize: true } },
                { target: 'pino/file', options: { destination: './app.log', mkdir: true } },
              ],
            }
          : undefined,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        DB_TYPE: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get<any>('DB_TYPE'),
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [UserEntity, UserSessionEntity],
          synchronize: true,
          autoLoadEntities: true
        };
      },
    }),
    AuthModule,
    MasterModule,
    ProfilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

