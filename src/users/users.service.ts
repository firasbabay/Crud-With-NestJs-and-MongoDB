import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/Schemas/User.schema';
import { CreateUserDto } from './Dto/CreateUser.dto';
import { updateUserDto } from './Dto/UpdateUser.dto';
import { UserSettings } from 'src/Schemas/UserSettings.schema';

@Injectable()
export class usersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private userSettingModel: Model<UserSettings>,
  ) {}

  async createUser({ settings, ...createUserDto }: CreateUserDto) {
    if (settings) {
      const newSettings = new this.userSettingModel(settings);
      const savedSettings = await newSettings.save();
      const newUser = new this.userModel({
        ...createUserDto,
        settings: savedSettings._id,
      });
      return newUser.save();
    }
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  getUsers() {
    return this.userModel.find().populate(['settings', 'posts']);
  }

  getUsersById(id: string) {
    return this.userModel.findById(id).populate('settings');
  }

  updateUser(id: string, updateUserDto: updateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
