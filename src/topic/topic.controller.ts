import {
  Controller,
  Get,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
  HttpCode,
  UseGuards,
  Body,
  Req,
  Patch,
  Put,
} from '@nestjs/common';
import { TopicService } from './topic.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { SubjectRepository } from 'src/subject/subject.repository';
import { JwtGuard, RoleGuard } from 'src/auth/guard';
import { Role } from '@prisma/client';
import { CreateTopicDto, IdDto, UpdateTopicDto, UploadVideoDto } from 'src/dto';
import { ReqUser } from 'src/types';

@Controller('topic')
export class TopicController {
  constructor(
    private readonly topicService: TopicService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtGuard, new RoleGuard(Role.TEACHER, false))
  @UseInterceptors(FileInterceptor('video'))
  async create(
    @Body() dto: CreateTopicDto,
    @Req() req: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const user = req.user as ReqUser;
    await this.topicService.confirmTeacher(user, dto.subjectId);

    if (file) {
      const uploadResult = await this.cloudinaryService.uploadVideo(file);
      dto.videoUrl = uploadResult.url;
    }

    const topic = await this.topicService.create(dto);

    return {
      message: 'Topic created',
      data: topic,
    };
  }

  @Patch('video')
  @UseGuards(JwtGuard, new RoleGuard(Role.TEACHER, false))
  @UseInterceptors(FileInterceptor('video'))
  async uploadVideo(
    @Body() dto: UploadVideoDto,
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user = req.user as ReqUser;
    const topic = await this.topicService.findOne(dto);
    await this.topicService.confirmTeacher(user, topic.subjectId);

    const uploadResult = await this.cloudinaryService.uploadVideo(file);
    dto.videoUrl = uploadResult.url;

    const result = await this.topicService.uploadVideo(dto);

    return {
      message: 'Video uploaded',
      data: result,
    };
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  async findOne(@Param() dto: IdDto) {
    const topic = await this.topicService.findOne(dto);

    return {
      message: 'Topic found',
      data: topic,
    };
  }

  @Get('/subject/:id')
  @UseGuards(JwtGuard)
  async findBySubjectId(@Param() dto: IdDto) {
    const topics = await this.topicService.findBySubjectId(dto);

    return {
      message: 'Topics found',
      data: topics,
    };
  }

  @Put()
  @UseGuards(JwtGuard, new RoleGuard(Role.TEACHER, false))
  async update(@Body() dto: UpdateTopicDto, @Req() req: any) {
    const user = req.user as ReqUser;
    await this.topicService.confirmTeacher(user, dto.id);
    const topic = await this.topicService.update(dto);

    return {
      message: 'Topic updated',
      data: topic,
    };
  }
}