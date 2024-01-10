import { ApiProperty } from '@nestjs/swagger';

export class CreateCookieDto {
  @ApiProperty()
  key: string;

  @ApiProperty()
  value: string;

  @ApiProperty()
  options?: any;
}
