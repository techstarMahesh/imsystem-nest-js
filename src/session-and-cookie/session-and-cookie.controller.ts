import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { SessionAndCookieService } from './session-and-cookie.service';
import { Request, Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCookieDto } from './dto/create-cookie.dto';

@ApiTags('Session And Cookie')
@ApiBearerAuth()
@Controller({
  path: 'session',
  version: '1',
})
export class SessionAndCookieController {
  constructor(private readonly sessionAndCookieService: SessionAndCookieService) {}

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

  @Patch(':key')
  updateCookies(@Req() request: Request, @Param('key') key: string, @Param('value') value: string) {
    return this.sessionAndCookieService.updateCookieValue(request, key, value);
  }
}

