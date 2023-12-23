import { IsBoolean, IsEmail, IsString, Matches, MaxLength, MinLength } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsTrue } from 'src/utils/validators/booleanValidator';

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
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  password: string;

  @ApiProperty({ example: 'Password@1' })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  confirmPassword: string;

  @ApiProperty({ example: true })
  @IsBoolean({ always: true })
  @IsTrue()
  termAndCondition: boolean;
}
