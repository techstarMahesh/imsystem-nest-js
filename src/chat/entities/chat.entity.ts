import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import { Base } from 'src/utils/helper/base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Chat extends Base {
  @ApiProperty()
  @Column()
  chat: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'chatFrom' })
  chatFrom: User;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'chatTo' })
  chatTo: User;

  @ApiProperty({ type: () => Task })
  @ManyToOne(() => Task, (task) => task.id, { eager: true })
  @JoinColumn({ name: 'task' })
  task: Task;
}

