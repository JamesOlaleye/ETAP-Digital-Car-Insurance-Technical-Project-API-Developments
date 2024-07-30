import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { PrismaService } from 'src/prisma/prisma.service';
  import { FindUserDto, FindUsersDto } from 'src/dto';
  import { Role } from '@prisma/client';
  
  @Injectable()
  export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}
  
    async findOne(dto: FindUserDto) {
      const { id, role } = dto;
  
      const where: any = { id };
      if (role) {
        where.role = role;
      }
  
      const user = await this.prisma.user.findUnique({ where });
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      return user;
    }
  
    async findMany(dto: FindUsersDto) {
      const { role, page, limit } = dto;
      const where: any = {};
  
      if (role) {
        where.role = role;
      }
  
      const skip = (page - 1) * limit;
      return await this.prisma.user.findMany({
        where,
        take: limit,
        skip,
      });
    }
  
    async listCount(dto: FindUsersDto) {
      const { role } = dto;
      const where: any = {};
  
      if (role) {
        where.role = role;
      }
  
      return await this.prisma.user.count({ where });
    }
    async findTeachers() {}
    async findStudents() {}
    async findAdmin() {}
    async makeTeacher(id: string) {
      const args = new FindUserDto();
      args.id = id;
  
      const user = await this.findOne(args);
  
      if (user.role !== Role.STUDENT) {
        throw new BadRequestException('Cannot perform this operation');
      }
  
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          role: Role.TEACHER,
        },
      });
    }
    async update() {}
  }