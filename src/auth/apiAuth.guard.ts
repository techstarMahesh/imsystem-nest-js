import { Injectable, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@Injectable()
export class ApiAuthGuard {
  constructor() {
    applyDecorators(ApiBearerAuth());
  }
}
