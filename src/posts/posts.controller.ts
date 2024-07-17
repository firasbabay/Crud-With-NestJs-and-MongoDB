import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/CreatePost.dto';

@Controller('Posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createPost(@Body() CreatePostDto: CreatePostDto) {
    return this.postsService.createPost(CreatePostDto);
  }
}
