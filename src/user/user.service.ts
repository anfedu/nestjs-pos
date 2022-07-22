import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    createUserDto.password = this.hash(createUserDto.password);
    return this.userRepo.save(createUserDto);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    updateUserDto.id = id;
    if (updateUserDto.password) {
      updateUserDto.password = this.hash(updateUserDto.password);
    }
    return this.userRepo.save(updateUserDto);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    return this.userRepo.remove(user);
  }

  hash(plainPassword: string) {
    const hash = bcrypt.hashSync(plainPassword, 10);
    return hash;
  }
  compare(plainPassword: string, hash: string) {
    const valid = bcrypt.compareSync(plainPassword, hash);
    return valid;
  }
}
