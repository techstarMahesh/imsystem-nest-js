import { Module } from '@nestjs/common';
import { CookiesController } from './cookies.controller';
import { CookiesService } from './session-and-cookie.service';

@Module({
  controllers: [CookiesController],
  providers: [CookiesService],
})
export class CookiesModule {}

