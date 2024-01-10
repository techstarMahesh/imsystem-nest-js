import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
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
    this.sessionAndCookieService.setCookie(request, response, createCookieDto);
    return this.findAll(request);
  }

  @Get()
  findAll(@Req() request: Request) {
    return this.sessionAndCookieService.findAll(request);
  }
}

