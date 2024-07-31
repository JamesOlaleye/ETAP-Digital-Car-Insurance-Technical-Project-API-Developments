import { Injectable } from '@nestjs/common';
import { ProgressRepository } from './progress.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubjectRepository } from 'src/subject/subject.repository';
import { CreateProgressDto, UpdateProgressDto } from 'src/dto';

@Injectable()
export class ProgressService {
  constructor(
    private readonly progressRepo: ProgressRepository,
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateProgressDto) {
    return await this.progressRepo.create(dto);
  }

  async update(dto: UpdateProgressDto) {
    return await this.progressRepo.update(dto);
  }

  async getOne(studentId: string, topicId: string) {
    return await this.progressRepo.findExisting(studentId, topicId);
  }

  async getBySubject(id: string) {
    return await this.progressRepo.findBySubject(id);
  }

  async getMyProgress(studentId: string, subjectId: string) {
    return await this.progressRepo.findMyProgress(studentId, subjectId);
  }

  async subjectRankings(id: string) {
    const progress = await this.progressRepo.findBySubject(id);

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
}
