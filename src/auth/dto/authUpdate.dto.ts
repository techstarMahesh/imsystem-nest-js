import { PartialType } from '@nestjs/swagger';
import { AuthRegisterDto } from './authRegister.dto';

export class AuthUpdateDto extends PartialType(AuthRegisterDto) {}
