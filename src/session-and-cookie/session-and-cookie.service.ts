import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CreateCookieDto } from './dto/create-cookie.dto';

@Injectable()
export class SessionAndCookieService {
  setCookie(request, response, createCookieDto: CreateCookieDto) {
    response.cookie(createCookieDto.key, createCookieDto.value, createCookieDto.options);
  }

  findAll(request: Request) {
    return request.cookies;
  }
}

