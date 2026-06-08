import { Injectable } from '@nestjs/common';

// @Injectable()
export class AppService {
  getHello(text: string | null = 'World'): string {
    return 'Hello ' + text;
  }
}
