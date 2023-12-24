import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsStrongPassword } from 'class-validator';
import { IsTrue } from 'src/utils/validators/booleanValidator';

export class AuthRegisterDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'johndev' })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userName: string;

  @ApiProperty({ example: 'johndev@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password@1' })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @ApiProperty({ example: true })
  @IsBoolean({ always: true })
  @IsTrue()
  termAndCondition: boolean;

  // @ApiProperty({ example: 'Password@1' })
  // @IsString()
  // @Equals('password', { message: 'password and confirm password should be equal' })
  // confirmPassword: string;
}
