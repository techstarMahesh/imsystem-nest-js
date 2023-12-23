import {
  IsBoolean,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Equals,
  IsAlpha,
  IsPhoneNumber,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsTrue } from 'src/utils/validators/booleanValidator';
import { RoleEnum } from '../../utils/enums/roleEnum';
import { GenderEnum } from 'src/utils/enums/genderEnum';
import { IsEnum } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @IsAlpha()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsAlpha()
  lastName: string;

  @ApiProperty({ example: 'johndoe' })
  @IsString()
  userName: string;

  @ApiProperty({ example: 'johndoe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password@1' })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  password: string;

  @ApiProperty({ example: 'Password@1' })
  @IsString()
  @Equals('password', { message: 'password and confirm password should be equal' })
  confirmPassword: string;

  @ApiProperty({ example: '+919876543210' })
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({ example: GenderEnum.MALE })
  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @ApiProperty({ example: RoleEnum.USER })
  @IsEnum(RoleEnum)
  role: RoleEnum;

  @ApiProperty({ example: true })
  @IsBoolean({ always: true })
  @IsTrue()
  termAndCondition: boolean;
}
