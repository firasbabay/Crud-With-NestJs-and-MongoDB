import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/nestjs'),
    UsersModule,
    PostsModule,
  ],
})
export class AppModule {}
