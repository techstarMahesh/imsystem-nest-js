import { IsString, IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'johndev' })
  @IsString()
  @IsNotEmpty()
  // TODO: Add validation to check exist or not
  login: string;

  @ApiProperty({ example: 'Password@1' })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message: 'Invalid username and password',
    },
  )
  password: string;
}
