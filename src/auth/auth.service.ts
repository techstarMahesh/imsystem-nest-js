import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRegisterDto } from './dto/authRegister.dto';
import { UserService } from 'src/user/user.service';
import { RoleEnum } from 'src/utils/enums/roleEnum';
import { GenderEnum } from 'src/utils/enums/genderEnum';
import { LoginDto } from './dto/authLogin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PayloadType } from 'src/utils/types/payload.type';
import { User } from 'src/user/entities/user.entity';
import { AuthLoginDtoResponse } from './dto/authLogin.dto.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async register(createAuthDto: AuthRegisterDto): Promise<User> {
    const fullName = createAuthDto.fullName.split(' ');
    const user = this.userService.create({
      ...createAuthDto,
      firstName: fullName[0],
      lastName: fullName[1],
      role: RoleEnum.USER,
      gender: GenderEnum.OTHER,
    });
    return user;
  }

  async login(loginDto: LoginDto): Promise<AuthLoginDtoResponse> {
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

  me(user: PayloadType): Promise<User> {
    return this.userService.findOne({
      userName: user.sub,
    });
  }
}

