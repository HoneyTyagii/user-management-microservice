import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: CreateUserDto): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }

  async remove(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  async search(username: string, minAge?: number, maxAge?: number): Promise<User[]> {
    const query: any = {};

    if (username) {
      query.username = { $regex: username, $options: 'i' };
    }

    if (minAge || maxAge) {
      const today = new Date();
      const minDate = new Date(today.setFullYear(today.getFullYear() - (maxAge || Infinity)));
      const maxDate = new Date(today.setFullYear(today.getFullYear() - (minAge || 0)));

      query.birthdate = { $gte: minDate, $lte: maxDate };
    }

    return this.userModel.find(query).exec();
  }
}