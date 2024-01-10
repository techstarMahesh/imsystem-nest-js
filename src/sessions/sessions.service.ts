import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Request } from 'express';

@Injectable()
export class SessionsService {
  create(request: Request, createSessionDto: CreateSessionDto) {
    return (request.session[createSessionDto.key] = createSessionDto.value);
  }

  findAll(req: Request) {
    return req.session;
  }

  findOne(req: Request, key: string) {
    return req.session[key];
  }

  update(req: Request, updateSessionDto: UpdateSessionDto) {
    return (req.session[updateSessionDto.key] = updateSessionDto.value);
  }

  remove(req: Request, key: string) {
    return delete req.session[key];
  }
}

