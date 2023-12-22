import { IsBoolean, IsNumber, IsString } from '@nestjs/class-validator';

export class DatabaseConfigType {
  @IsString()
  name: string;

  @IsNumber()
  port: number;

  @IsString()
  host: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  database: string;

  @IsBoolean()
  synchronize: boolean;
}
