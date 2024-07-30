import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { PrismaService } from 'src/prisma/prisma.service';
  import {
    CreateSubjectDto,
    AssignTeacherDto,
    FindSubjectsDto,
    FindUserDto,
    IdDto,
  } from 'src/dto';
  import { UserRepository } from 'src/user/user.repository';
  import { Role } from '@prisma/client';
  import { ReqUser } from 'src/types';
  
  @Injectable()
  export class SubjectRepository {
    constructor(
      private readonly prisma: PrismaService,
      private readonly userRepo: UserRepository,
    ) {}
  
    async createSubject(dto: CreateSubjectDto) {
      const existing = await this.prisma.subject.findUnique({
        where: { name: dto.name },
      });
  
      if (existing) {
        throw new ConflictException('Subject with name already exists');
      }
  
      if (dto.teacherId) {
        const args = new FindUserDto();
        args.id = dto.teacherId;
        args.role = Role.TEACHER;
        await this.userRepo.findOne(args);
      }
  
      return await this.prisma.subject.create({
        data: dto,
        include: { teacher: true },
      });
    }
  
    async findOne(id: string) {
      const subject = await this.prisma.subject.findUnique({
        where: { id },
        include: {
          teacher: true,
          students: {
            select: { id: true, firstName: true, lastName: true, email: true },
          },
        },
      });
  
      if (!subject) {
        throw new NotFoundException('Subject not found');
      }
  
      return subject;
    }
  
    async findMany(dto: FindSubjectsDto) {
      const { limit, page } = dto;
      const skip = (page - 1) * limit;
  
      return await this.prisma.subject.findMany({
        skip,
        take: limit,
        include: {
          teacher: {
            select: { id: true, firstName: true, lastName: true, email: true },
          },
          students: {
            select: { id: true },
          },
        },
      });
    }
  
    async listCount() {
      return await this.prisma.subject.count();
    }
  
    updateSubject() {}
  
    deleteSubject() {}
  
    async assignTeacher(dto: AssignTeacherDto) {
      const { id, teacherId } = dto;
  
      await this.findOne(id);
  
      const args = new FindUserDto();
      args.id = teacherId;
      args.role = Role.TEACHER;
  
      await this.userRepo.findOne(args);
  
      return await this.prisma.subject.update({
        where: {
          id,
        },
        data: {
          teacherId,
        },
        include: {
          teacher: true,
        },
      });
    }
  
    async enroll(user: ReqUser, dto: IdDto) {
      await this.findOne(dto.id);
  
      if (user.role !== Role.STUDENT) {
        throw new BadRequestException('Only Students can enroll');
      }
  
      await this.prisma.$transaction(async (prisma) => {
        // Enroll the student in the subject
        await prisma.subject.update({
          where: { id: dto.id },
          data: {
            students: {
              connect: { id: user.id },
            },
          },
        });
  
        // Add the subject to the student's enrolled subjects
        await prisma.user.update({
          where: { id: user.id },
          data: {
            subjects: {
              connect: { id: dto.id },
            },
          },
        });
      });
  
      return await this.findOne(dto.id);
    }
  
    async deregister() {}
  }