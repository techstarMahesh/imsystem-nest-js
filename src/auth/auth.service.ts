import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRegisterDto } from './dto/authRegister.dto';
import { UserService } from 'src/user/user.service';
import { RoleEnum } from 'src/utils/enums/roleEnum';
import { GenderEnum } from 'src/utils/enums/genderEnum';
import { LoginDto } from './dto/authLogin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async register(createAuthDto: AuthRegisterDto) {
    const saltOrRounds = 10;
    const password = createAuthDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const fullName = createAuthDto.fullName.split(' ');
    const user = this.userService.create({
      ...createAuthDto,
      firstName: fullName[0],
      lastName: fullName[1],
      password: hash,
      role: RoleEnum.USER,
      gender: GenderEnum.OTHER,
    });
    return user;
  }

  async login(loginDto: LoginDto) {
    let user = await this.userService.findOne({
      email: loginDto.login,
    });

    if (!user) {
      user = await this.userService.findOne({
        userName: loginDto.login,
      });
    }

    if (!user) {
      throw new HttpException('Invalid username or password', HttpStatus.BAD_REQUEST);
    }

    const validatePassword = await bcrypt.compare(loginDto.password, user.password);

    if (!validatePassword) {
      throw new HttpException('Invalid username or password', HttpStatus.BAD_REQUEST);
    }

    const payload = {
      sub: user.userName,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

