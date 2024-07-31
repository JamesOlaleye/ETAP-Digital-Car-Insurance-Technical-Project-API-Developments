import { PrismaService } from 'src/prisma/prisma.service';
import { TopicRepository } from 'src/topic/topic.repository';
import { SubjectRepository } from 'src/subject/subject.repository';
import { UserRepository } from 'src/user/user.repository';
import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateProgressDto, UpdateProgressDto, FindUserDto } from 'src/dto';

@Injectable()
export class ProgressRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly topicRepo: TopicRepository,
    private readonly subjectRepo: SubjectRepository,
    private readonly config: ConfigService,
  ) {}

  async create(dto: CreateProgressDto) {
    const { studentId, topicId, apiKey } = dto;
    this.validKey(apiKey);
    const topic = await this.topicRepo.findOne(topicId);

    const students = await this.subjectRepo.listEnrolledStudents(
      topic.subjectId,
    );

    const isStudent = students.find((student) => student.id === studentId);

    if (!isStudent) {
      throw new BadRequestException('Student not enrolled in subject');
    }

    const existing = await this.findExisting(studentId, topicId);

    return existing
      ? existing
      : await this.prisma.progress.create({
          data: {
            studentId,
            topicId,
          },
        });
  }

  async update(dto: UpdateProgressDto) {
    const { studentId, topicId, apiKey, progress } = dto;
    this.validKey(apiKey);

    const existing = await this.findExisting(studentId, topicId);

    if (!existing) {
      return this.create(dto);
    } else if (existing.completed) {
      return existing;
    }

    return this.prisma.progress.update({
      where: { id: existing.id },
      data: {
        progress,
        completed: progress === 100,
      },
    });
  }

  async findExisting(studentId: string, topicId: string) {
    return this.prisma.progress.findFirst({
      where: { studentId, topicId },
    });
  }

  async findOne() {}

  async findMany() {}

  async findByTopic() {}

  async findByStudent() {}

  async findBySubject(id: string) {
    await this.subjectRepo.findOne(id);

    return await this.prisma.progress.findMany({
      where: {
        topic: {
          subjectId: id,
        },
      },
    });
  }

  async findMyProgress(studentId: string, subjectId: string) {
    await this.subjectRepo.findOne(subjectId);

    return await this.prisma.progress.findMany({
      where: {
        studentId,
        topic: {
          subjectId,
        },
      },
    });
  }

  async rankStudentsForSubject(id: string) {
    const progress = await this.findBySubject(id);

    const rankings = progress.reduce(
      (acc, pro) => {
        if (acc[pro.studentId]) {
          acc[pro.studentId] += pro.progress;
        } else {
          acc[pro.studentId] = pro.progress;
        }

        return acc;
      },
      {} as { [key: string]: number },
    );

    const studentIds = Object.keys(rankings);

    const students = await this.prisma.user.findMany({
      where: {
        id: {
          in: studentIds,
        },
      },
    });

    const result = students.map((student) => ({
      student,
      completion: rankings[student.id],
    }));

    return result.sort((a, b) => b.completion - a.completion);
  }

  validKey(key: string) {
    if (key === this.config.get('API_KEY')) {
      return true;
    } else {
      throw new ForbiddenException('Invalid API Key');
    }
  }
}
