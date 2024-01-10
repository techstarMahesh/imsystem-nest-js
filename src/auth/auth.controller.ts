import { Controller, Post, Body, Req, Get, Patch, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthRegisterDto } from './dto/authRegister.dto';
import { LoginDto } from './dto/authLogin.dto';
import { Public } from 'src/utils/decorators/setPublic.decorator';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { RoleEnum } from 'src/utils/enums/roleEnum';
import { AuthUpdateDto } from './dto/authUpdate.dto';
import { AuthForgotPasswordDtoResponse } from './dto/authLogin.dto.response';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  register(@Body() registerDto: AuthRegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @Public()
  login(@Body() registerDto: LoginDto) {
    return this.authService.login(registerDto);
  }

  @Post('logout')
  logout(@Req() req) {
    return this.authService.logout(req.user);
  }

  @Post('forgot-password')
  forgotPassword(@Body() authForgotPasswordDtoResponse: AuthForgotPasswordDtoResponse) {
    return this.authService.forgotPassword();
  }

  @Post('me')
  testProfile(@Req() req, @Body() authUserDto: AuthUpdateDto) {
    return this.authService.test(req.user, authUserDto);
  }

  @Roles(RoleEnum.ALL)
  @Get('me')
  meGet(@Req() req) {
    return this.authService.me(req.user);
  }

  @Roles(RoleEnum.ALL)
  @Patch('me')
  mePatch(@Req() req, @Body() updateUserBody: AuthUpdateDto) {
    return this.authService.mePatch(req.user, updateUserBody);
  }

  @Roles(RoleEnum.ALL)
  @Delete('me')
  meDelete(@Req() req) {
    return this.authService.meDelete(req.user);
  }
}

