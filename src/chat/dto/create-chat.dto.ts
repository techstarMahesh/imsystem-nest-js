import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import { DeepPartial } from 'typeorm';

export class CreateChatDto {
  @ApiProperty()
  chat: string;

  @ApiProperty({ type: Number })
  chatFrom: DeepPartial<User>;

  @ApiProperty({ type: Number })
  chatTo: DeepPartial<User>;

  @ApiProperty({ type: Number })
  task: DeepPartial<Task>;
}

