import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Sessions')
@ApiBearerAuth()
@Controller({
  path: 'session',
  version: '1',
})
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  create(@Req() req: Request, @Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.create(req, createSessionDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.sessionsService.findAll(req);
  }

  @Get(':key')
  findOne(@Req() req: Request, @Param('key') key: string) {
    return this.sessionsService.findOne(req, key);
  }

  @Patch()
  update(@Req() req: Request, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionsService.update(req, updateSessionDto);
  }

  @Delete(':key')
  remove(@Req() req: Request, @Param('key') key: string) {
    return this.sessionsService.remove(req, key);
  }
}

