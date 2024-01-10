import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CreateCookieDto } from './dto/create-cookie.dto';

@Injectable()
export class SessionAndCookieService {
  setCookie(response, createCookieDto: CreateCookieDto) {
    response.cookie(createCookieDto.key, createCookieDto.value, createCookieDto.options);
    return 'ok';
  }

  findAllCookies(request: Request) {
    return request.cookies;
  }

  findCookieValue(request: Request, key: string) {
    return request.cookies[key];
  }

  updateCookieValue(request: Request, key: string, value: string) {
    return (request.cookies[key] = value);
  }
}

