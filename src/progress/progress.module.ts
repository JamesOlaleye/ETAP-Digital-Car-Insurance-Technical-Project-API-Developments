import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { ProgressRepository } from './progress.repository';
import { SubjectRepository } from 'src/subject/subject.repository';
import { TopicRepository } from 'src/topic/topic.repository';

@Module({
  controllers: [ProgressController],
  providers: [
    ProgressService,
    ProgressRepository,
    TopicRepository,
    SubjectRepository,
  ],
})
export class ProgressModule {}
