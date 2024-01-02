import { IsString, IsBoolean } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
}

