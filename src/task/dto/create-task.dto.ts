import { IsString, IsBoolean, IsNumber, Validate } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { IsExist } from 'src/utils/validators/isExist.validator';
import { DeepPartial } from 'typeorm';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsBoolean()
  status: boolean;

  @ApiProperty()
  @IsString()
  taskTag: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  // @Validate(IsExist, ['User'], {
  //   message: 'emailNotExists',
  // })
  // FIXME: Add validation to check user exist or not
  userId: DeepPartial<User>;
}

