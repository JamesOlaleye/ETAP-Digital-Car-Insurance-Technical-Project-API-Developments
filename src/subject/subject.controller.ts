import {
  Controller,
  Get,
  Post,
  Patch,
  UseGuards,
  ValidationPipe,
  Body,
  Req,
  Param,
  Query,
  HttpCode,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectRepository } from './subject.repository';
import { JwtGuard, RoleGuard } from 'src/auth/guard';
import {
  AssignTeacherDto,
  CreateSubjectDto,
  FindSubjectsDto,
  IdDto,
} from 'src/dto';
import { Role } from '@prisma/client';
import { ReqUser } from 'src/types';

@Controller('subject')
export class SubjectController {
  constructor(
    private readonly subjectService: SubjectService,
    private readonly subjectRepo: SubjectRepository,
  ) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtGuard, new RoleGuard(Role.ADMIN, false))
  async create(@Body() dto: CreateSubjectDto) {
    const subject = await this.subjectService.create(dto);

    return {
      message: 'Subject Created',
      data: subject,
    };
  }

  @Get()
  async list(@Query() dto: FindSubjectsDto) {
    const subjects = await this.subjectService.findMany(dto);
    const total = await this.subjectRepo.listCount();

    return {
      message: 'Subject List',
      total,
      page: dto.page,
      limit: dto.limit,
      data: subjects,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const subject = await this.subjectService.findOne(id);

    return {
      message: 'Subject found',
      data: subject,
    };
  }

  @Patch('assign')
  @UseGuards(JwtGuard, new RoleGuard(Role.ADMIN, false))
  async assignTeacher(@Body() dto: AssignTeacherDto) {
    const subject = await this.subjectService.assignTeacher(dto);

    return {
      message: 'Teacher Assigned',
      data: subject,
    };
  }

  @Get('mine')
  @UseGuards(JwtGuard)
  async listMySubjects(@Req() req: any) {
    const user = req.user as ReqUser;
    const subjects = await this.subjectService.listMySubjects(user);

    return {
      message: 'Your subjects',
      data: subjects,
    };
  }

  @Post('enroll')
  @UseGuards(JwtGuard, new RoleGuard(Role.STUDENT, false))
  async enroll(@Body() dto: IdDto, @Req() req: any) {
    const user = req.user as ReqUser;

    const subject = await this.subjectService.enroll(user, dto);

    return {
      message: 'Subject enrolled',
      data: subject,
    };
  }
}
