import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { validate } from 'class-validator';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) protected userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto): Promise<User>{
    //DTO createUserDto trae todo lo que viene por body
    
    const createdUser= await this.userModel.create(createUserDto)
    return createdUser;
  }

  findAll():Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
