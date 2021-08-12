import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>,) { }

  async create(createUserDto: CreateUserDto) {
    const { password: _password, ...user } = await this.usersRepository.save(createUserDto)
    return user
  }

  async findAll() {
    const result = await this.usersRepository.find();
    const users = result.map(user => {
      const { password: _password, ...rest } = user
      return rest
    })
    return users
  }

  async findOne(id: number) {
    const found = await this.usersRepository.findOne(id);
    if (!found) {
      throw new NotFoundException({ message: `User ${id} not found` })
    }
    const { password, ...rest } = found
    return rest
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const found = await this.usersRepository.findOne(id);
    if (!found) {
      throw new NotFoundException({ message: `User ${id} not found` })
    }
    const { username, password, isActive, email } = updateUserDto
    found.username = username ? username : found.username
    found.password = password ? password : found.password
    found.isActive = isActive ? isActive : found.isActive
    found.email = email ? email : found.email
    const { password: _password, ...rest } = await this.usersRepository.save(found)
    return rest
  }

  async remove(id: number) {
    const found = await this.usersRepository.findOne(id);
    if (!found) {
      throw new NotFoundException({ message: `User ${id} not found` })
    }
    await this.usersRepository.remove(found);
    return "Delete Success"
  }
}
