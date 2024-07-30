import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { TopicRepository } from './topic.repository';
import { SubjectRepository } from 'src/subject/subject.repository';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  controllers: [TopicController],
  providers: [
    TopicService,
    TopicRepository,
    SubjectRepository,
    CloudinaryService,
  ],
})
export class TopicModule {}