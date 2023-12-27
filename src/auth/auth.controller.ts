import { Controller, Post, Body, Req, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthRegisterDto } from './dto/authRegister.dto';
import { LoginDto } from './dto/authLogin.dto';
import { Public } from 'src/utils/decorators/setPublic.decorator';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { RoleEnum } from 'src/utils/enums/roleEnum';
import { RolesGuard } from 'src/utils/guards/roles.guard';

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

  @Post('login')
  @UseGuards(RolesGuard)
  login(@Body() registerDto: LoginDto) {
    return this.authService.login(registerDto);
  }

  @Roles(RoleEnum.USER)
  @Get('me')
  me(@Req() req) {
    return this.authService.me(req.user);
  }
}

