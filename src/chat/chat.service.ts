import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(@InjectRepository(Chat) private readonly chatRepository: Repository<Chat>) {}
  create(createChatDto: CreateChatDto) {
    return this.chatRepository.save(this.chatRepository.create(createChatDto));
  }

  findAll(): Promise<Chat[]> {
    return this.chatRepository.find();
  }

  findOne(id: number): Promise<Chat> {
    return this.chatRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateChatDto: UpdateChatDto): Promise<Chat> {
    const updatedChat = await this.chatRepository.update(id, this.chatRepository.create(updateChatDto));
    if (updatedChat.affected === 1) {
      return this.findOne(id);
    }
    throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: number): Promise<Chat> {
    const deletedChat = await this.chatRepository.softDelete(id);
    if (deletedChat.affected === 1) {
      return this.findOne(id);
    }
    throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
  }
}

