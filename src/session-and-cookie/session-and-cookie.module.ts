import { Module } from '@nestjs/common';
import { SessionAndCookieService } from './session-and-cookie.service';
import { SessionAndCookieController } from './session-and-cookie.controller';

@Module({
  controllers: [SessionAndCookieController],
  providers: [SessionAndCookieService],
})
export class SessionAndCookieModule {}
