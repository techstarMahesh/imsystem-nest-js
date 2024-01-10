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
import { AuthUpdateDto } from './dto/authUpdate.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

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
      roles: [RoleEnum.USER],
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
      roles: user.roles,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(user: PayloadType): Promise<void> {
    console.log(user);
  }

  async test(user: PayloadType, authUserDto: AuthUpdateDto): Promise<boolean> {
    const userData = await this.me(user);
    const { fullName, password, ...userToCompare } = authUserDto;

    const userCompared: UpdateUserDto = {
      ...userData,
      ...userToCompare,
    };
    let passwordCheck = true;
    if (password) {
      passwordCheck = await bcrypt.compare(password, userData.password);
      if (!passwordCheck) {
        return false;
      }
    }

    if (fullName) {
      const fullNameData = fullName.split(' ');
      userCompared.firstName = fullNameData[0];
      userCompared.lastName = fullNameData[1];
    }
    return JSON.stringify(userCompared) === JSON.stringify(userData);
  }

  me(user: PayloadType): Promise<User> {
    return this.userService.findOne({
      userName: user.sub,
    });
  }

  async mePatch(user: PayloadType, updateUserDto: AuthUpdateDto): Promise<User> {
    const userData = await this.me(user);
    const { fullName, ...userToPatch } = updateUserDto;
    const fullNameData = fullName.split(' ');
    return this.userService.update(userData.id, {
      ...userData,
      ...userToPatch,
      firstName: fullNameData[0],
      lastName: fullNameData[1],
    });
  }

  async meDelete(user: PayloadType): Promise<User> {
    const userData = await this.me(user);
    return this.userService.remove(userData.id);
  }
}

