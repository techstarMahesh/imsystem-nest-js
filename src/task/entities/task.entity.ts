import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { Base } from 'src/utils/helper/base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

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

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'user' })
  user: User;
}

