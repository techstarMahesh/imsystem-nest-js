import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const updateUser = await this.userRepository.update(id, this.userRepository.create(updateUserDto));
    if (updateUser.affected === 1) {
      return this.findOne({ id: +id });
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number): Promise<User> {
    const updateResult = await this.userRepository.softDelete(id);
    if (updateResult.affected === 1) {
      return this.findOne({ id: +id });
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
