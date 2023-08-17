import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  getUser(_id: number): Promise<User> {
    return this.usersRepository.findOne({
      select: ['id', 'nombre', 'apellido', 'edad'],
      where: [{ id: _id }],
    });
  }

  updateUser(user: User): Promise<User>{
    return this.usersRepository.save(user);
  }

  createUser(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
  async deleteUser(user: User) {
    await this.usersRepository.delete(user);
  }
}
