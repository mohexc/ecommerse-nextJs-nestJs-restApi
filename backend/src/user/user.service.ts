import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>,) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const hashPassword = await bcrypt.hash(createUserDto.password, 10);
      createUserDto.password = hashPassword
      const { password, ...rest } = await this.usersRepository.save(createUserDto)
      return rest
    } catch (error) {
      return error
    }

  }

  async findAll() {
    try {
      const result = await this.usersRepository.find();
      const users = result.map(user => {
        const { password: _password, ...rest } = user
        return rest
      })
      return users
    } catch (error) {
      return error
    }

  }

  async findOneById(id: number) {
    try {
      const user = await this.usersRepository.findOne(id)
      if (!user) {
        throw new NotFoundException({ message: `User ${id} not found` })
      }
      const { password, isActive, ...rest } = user
      return rest
    } catch (error) {
      return error
    }

  }
  async findOneByUsername(username: string) {
    const user = await this.usersRepository.findOne({ where: { username } })
    if (!user) {
      throw new NotFoundException({ message: `User ${username} not found` })
    }
    return user
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
