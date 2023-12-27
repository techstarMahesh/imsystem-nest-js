import { IsBoolean, IsEmail, IsEnum, IsString, Matches, MaxLength, MinLength } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { GenderEnum } from 'src/utils/enums/genderEnum';
import { RoleEnum } from 'src/utils/enums/roleEnum';
import { Base } from 'src/utils/helper/base';
import { IsTrue } from 'src/utils/validators/booleanValidator';
import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';

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
  @IsString()
  @Exclude({ toPlainOnly: true })
  @Column()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  password: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @ApiProperty()
  @Column()
  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @ApiProperty()
  @Column({ type: 'simple-array' })
  @IsEnum(RoleEnum)
  roles: RoleEnum[];

  @ApiProperty()
  @IsBoolean({ always: true })
  @IsTrue()
  @Column()
  termAndCondition: boolean;
}
