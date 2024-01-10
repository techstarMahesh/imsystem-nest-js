import { PartialType } from '@nestjs/swagger';
import { AuthRegisterDto } from './authRegister.dto';

export class AuthUpdateSto extends PartialType(AuthRegisterDto) {}
