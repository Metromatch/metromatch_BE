import { NestFactory } from '@nestjs/core';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule).catch((error) => {
      throw error;
    });

    app.setGlobalPrefix('api');

    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    app.useGlobalInterceptors(new ResponseInterceptor());

    const config = new DocumentBuilder()
      .setTitle('Metromatch API')
      .setDescription('The Metromatch backend API documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/swagger', app, document);

    await app.listen(process.env.PORT ?? 3000).catch((error) => {
      throw error;
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
void bootstrap();
