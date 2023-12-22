import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {
    const dbName = this.configService.get<string>('dbs.database', {
      infer: true,
    });
    console.log(dbName);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
