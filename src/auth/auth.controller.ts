import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthRegisterDto } from './dto/authRegister.dto';
import { LoginDto } from './dto/authLogin.dto';
import { Public } from 'src/utils/decorators/setPublic.decorator';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() registerDto: AuthRegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  login(@Body() registerDto: LoginDto) {
    return this.authService.login(registerDto);
  }

  @Post('me')
  me() {
    return;
  }
}
