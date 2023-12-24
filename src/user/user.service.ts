import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { EntityCondication } from 'src/utils/types/entiryCondication';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}
  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(this.userRepository.create(createUserDto));
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(fields: EntityCondication<User>): Promise<User> {
    return this.userRepository.findOne({
      where: fields,
    });
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    this.userRepository.update(id, updateUserDto);
    return this.findOne({ id: +id });
  }

  remove(id: number) {
    return this.userRepository.softDelete(id);
  }
}
