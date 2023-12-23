import { IsBoolean, IsEmail, IsString, Matches, MaxLength, MinLength } from '@nestjs/class-validator';
import { Base } from 'src/utils/helper/base';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends Base {
  @IsString()
  @Column()
  firstName: string;

  @IsString()
  @Column()
  lastName: string;

  @IsString()
  @Column()
  userName: string;

  @IsEmail()
  @Column()
  email: string;

  @IsEmail()
  @MinLength(8)
  @MaxLength(20)
  @Column()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Column()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  confirmPassword: string;

  @IsBoolean({ always: true })
  @Column()
  termAndCondition: string;
}
