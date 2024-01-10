import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionDto {
  @ApiProperty()
  key: string;

  @ApiProperty()
  value: string;
}

