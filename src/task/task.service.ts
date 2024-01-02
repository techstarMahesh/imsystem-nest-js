import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>) {}
  create(createTaskDto: CreateTaskDto) {
    return this.taskRepository.save(this.taskRepository.create(createTaskDto));
  }

  findAll(page: number = 1, limit: number = 10) {
    return this.taskRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  findOne(id: number) {
    return this.taskRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.update(id, updateTaskDto);
  }

  remove(id: number) {
    return this.taskRepository.softDelete(id);
  }
}

