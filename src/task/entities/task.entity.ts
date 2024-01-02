import { ApiProperty } from '@nestjs/swagger';
import { Base } from 'src/utils/helper/base';
import { Column, Entity } from 'typeorm';

@Entity()
export class Task extends Base {
  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  status: boolean;

  @ApiProperty()
  @Column()
  taskTag: string;
}

