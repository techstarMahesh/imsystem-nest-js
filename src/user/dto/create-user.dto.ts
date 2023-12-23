import { IsBoolean, IsEmail, IsString, Matches, MaxLength, MinLength, Equals } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsTrue } from 'src/utils/validators/booleanValidator';
import { RoleEnum } from '../../utils/enums/roleEnum';
import { GenderEnum } from 'src/utils/enums/genderEnum';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
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

  @ApiProperty({ example: GenderEnum.MALE })
  @IsString()
  gender: GenderEnum;

  @ApiProperty({ example: RoleEnum.USER })
  @IsString()
  role: RoleEnum;

  @ApiProperty({ example: true })
  @IsBoolean({ always: true })
  @IsTrue()
  termAndCondition: boolean;
}
