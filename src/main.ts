import { NestFactory } from '@nestjs/core';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

let cachedServer: any;

async function bootstrap() {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule, { bufferLogs: true }).catch((error) => {
      throw error;
    });

    app.useLogger(app.get(Logger));

    app.use(helmet());
    app.enableCors();

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

    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new ResponseInterceptor());

    const config = new DocumentBuilder()
      .setTitle('Metromatch API')
      .setDescription('The Metromatch backend API documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/swagger', app, document);

    await app.init();
    cachedServer = app.getHttpAdapter().getInstance();
  }
  return cachedServer;
}

const isVercel = process.env.VERCEL === '1';

if (!isVercel) {
  bootstrap()
    .then((server) => {
      const port = process.env.PORT ?? 3000;
      server.listen(port, () => {
        console.log(`Local server listening on port ${port}`);
      });
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export default async (req: any, res: any) => {
  // Vercel sometimes strips the /api prefix from the request URL
  if (req.url && !req.url.startsWith('/api')) {
    req.url = `/api${req.url.startsWith('/') ? '' : '/'}${req.url}`;
  }
  const server = await bootstrap();
  return server(req, res);
};
