import { Controller, Post, Body, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthRegisterDto } from './dto/authRegister.dto';
import { LoginDto } from './dto/authLogin.dto';
import { Public } from 'src/utils/decorators/setPublic.decorator';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { RoleEnum } from 'src/utils/enums/roleEnum';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
@ApiBearerAuth()
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

  @Roles(RoleEnum.ADMIN)
  @Get('me')
  me(@Req() req) {
    return this.authService.me(req.user);
  }
}

