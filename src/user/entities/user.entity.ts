import { IsBoolean, IsEmail, IsString, Matches, MaxLength, MinLength, Validate } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Base } from 'src/utils/helper/base';
import { IsTrue } from 'src/utils/validators/booleanValidator';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends Base {
  @ApiProperty()
  @IsString()
  @Column()
  firstName: string;

  @ApiProperty()
  @IsString()
  @Column()
  lastName: string;

  @ApiProperty()
  @IsString()
  @Column()
  userName: string;

  @ApiProperty()
  @IsEmail()
  @Column()
  email: string;

  @ApiProperty()
  @MinLength(8)
  @MaxLength(20)
  @Column()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  password: string;

  @ApiProperty()
  @IsBoolean({ always: true })
  @IsTrue()
  @Column()
  termAndCondition: boolean;
}
