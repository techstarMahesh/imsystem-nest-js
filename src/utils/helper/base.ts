import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class Base extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @CreateDateColumn()
  CreateAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  UpdateAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  DeleteAt: Date;
}
