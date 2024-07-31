import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTopicDto, UpdateTopicDto, UploadVideoDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubjectRepository } from 'src/subject/subject.repository';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class TopicRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly subjectRepo: SubjectRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async create(dto: CreateTopicDto) {
    const { title, subjectId, videoUrl } = dto;
    const existing = await this.prisma.topic.findFirst({
      where: {
        title,
        subjectId,
      },
    });

    await this.subjectRepo.findOne(subjectId);

    if (existing) {
      throw new BadRequestException('Topic with name exists for this subject');
    }

    return await this.prisma.topic.create({
      data: {
        ...dto,
        active: videoUrl ? true : false,
      },
    });
  }

  async uploadVideo(dto: UploadVideoDto) {
    const { id, videoUrl } = dto;

    if (!videoUrl) {
      throw new BadRequestException('No video found');
    }

    await this.findOne(id);

    return await this.prisma.topic.update({
      where: { id },
      data: {
        videoUrl,
        active: true,
      },
    });
  }

  async update(dto: UpdateTopicDto) {
    const { id, ...data } = dto;

    await this.findOne(id);

    return await this.prisma.topic.update({
      where: { id },
      data,
    });
  }

  async findOne(id: string) {
    const topic = await this.prisma.topic.findUnique({
      where: { id },
    });

    if (!topic) {
      throw new NotFoundException('Topic not found');
    }

    return topic;
  }

  async findBySubjectId(id: string) {
    return await this.prisma.topic.findMany({
      where: {
        subjectId: id,
      },
    });
  }

  async deleteOne() {}
}
