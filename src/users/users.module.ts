import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/Schemas/User.schema';
import { usersService } from './users.service';
import { usersController } from './users.controller';
import {
  UserSettings,
  UserSettingsSchema,
} from 'src/Schemas/UserSettings.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema,
      },
      {
        name: UserSettings.name,
        schema: UserSettingsSchema,
      },
    ]),
  ],
  providers: [usersService],
  controllers: [usersController],
})
export class UsersModule {}
