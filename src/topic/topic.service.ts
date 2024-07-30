import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TopicRepository } from './topic.repository';
import { CreateTopicDto, IdDto, UpdateTopicDto, UploadVideoDto } from 'src/dto';
import { SubjectRepository } from 'src/subject/subject.repository';
import { ReqUser } from 'src/types';

@Injectable()
export class TopicService {
  constructor(
    private readonly topicRepo: TopicRepository,
    private readonly subjectRepo: SubjectRepository,
  ) {}

  async create(dto: CreateTopicDto) {
    return await this.topicRepo.create(dto);
  }

  async uploadVideo(dto: UploadVideoDto) {
    return await this.topicRepo.uploadVideo(dto);
  }

  async findOne(dto: IdDto) {
    return await this.topicRepo.findOne(dto.id);
  }

  async findBySubjectId(dto: IdDto) {
    return await this.topicRepo.findBySubjectId(dto.id);
  }

  async update(dto: UpdateTopicDto) {
    return await this.topicRepo.update(dto);
  }

  async confirmTeacher(user: ReqUser, id: string) {
    const subject = await this.subjectRepo.findOne(id);

    if (subject.teacherId !== user.id) {
      throw new UnauthorizedException('You do not teach this Subject');
    }

    return true;
  }
}