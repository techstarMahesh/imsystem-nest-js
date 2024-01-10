import { Body, Controller, Get, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { CookiesService } from './session-and-cookie.service';
import { Request, Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCookieDto } from './dto/create-cookie.dto';

@ApiTags('Cookies')
@ApiBearerAuth()
@Controller({
  path: 'cookies',
  version: '1',
})
export class CookiesController {
  constructor(private readonly sessionAndCookieService: CookiesService) {}

  @Post()
  create(
    @Req() request: Request,
    @Body() createCookieDto: CreateCookieDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.sessionAndCookieService.setCookie(response, createCookieDto);
  }

  @Get()
  findAllCookies(@Req() request: Request) {
    return this.sessionAndCookieService.findAllCookies(request);
  }

  @Get(':key')
  findCookies(@Req() request: Request, @Param('key') key: string) {
    return this.sessionAndCookieService.findCookieValue(request, key);
  }

  @Patch()
  updateCookies(@Res({ passthrough: true }) response: Request, @Body() updateCookieDto: CreateCookieDto) {
    return this.sessionAndCookieService.updateCookieValue(response, updateCookieDto);
  }
}

