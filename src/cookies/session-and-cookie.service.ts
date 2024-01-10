import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CreateCookieDto } from './dto/create-cookie.dto';

@Injectable()
export class CookiesService {
  setCookie(response: any, createCookieDto: CreateCookieDto) {
    response.cookie(createCookieDto.key, createCookieDto.value, createCookieDto.options);
    return 'ok';
  }

  findAllCookies(request: Request) {
    return request.cookies;
  }

  findCookieValue(request: Request, key: string) {
    return request.cookies[key];
  }

  updateCookieValue(response: any, updateCookieDto: CreateCookieDto) {
    response.cookie(updateCookieDto.key, updateCookieDto.value, updateCookieDto.options);
    return 'ok';
  }
}

