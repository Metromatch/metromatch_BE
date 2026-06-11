import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './modules/users/entities/users.entity';
import { UserSessionEntity } from './modules/auth/entities/user_session.entity';
import { AuthModule } from './modules/auth/auth.module';
import { MasterModule } from './modules/master/master.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
    MasterModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

