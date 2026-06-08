import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('cat')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('poop')
  getPoop(): string {
    return this.appService.getHello('poop');
  }
}
