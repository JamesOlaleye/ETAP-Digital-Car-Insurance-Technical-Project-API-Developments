import {
  Controller,
  Post,
  Patch,
  UseGuards,
  Get,
  Param,
  Body,
  Req,
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { CreateProgressDto, UpdateProgressDto } from 'src/dto';
import { JwtGuard, RoleGuard } from 'src/auth/guard';
import { Role } from '@prisma/client';
import { ReqUser } from 'src/types';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post()
  async create(@Body() dto: CreateProgressDto) {
    const progress = await this.progressService.create(dto);

    return {
      message: 'Progress',
      data: progress,
    };
  }

  @Patch()
  async update(@Body() dto: UpdateProgressDto) {
    const progress = await this.progressService.update(dto);

    return {
      message: 'Progress',
      data: progress,
    };
  }

  @Get('/mine/:id')
  @UseGuards(JwtGuard, new RoleGuard(Role.STUDENT, false))
  async mine(@Req() req: any, @Param('id') subjectId: string) {
    const user = req.user as ReqUser;

    const progress = await this.progressService.getMyProgress(
      user.id,
      subjectId,
    );

    return {
      message: 'Your progress',
      data: progress,
    };
  }

  @Get('/subject/:id')
  @UseGuards(JwtGuard, new RoleGuard(Role.TEACHER, true))
  async viewBySubj(@Param('id') id: string) {
    const progress = await this.progressService.getBySubject(id);

    return {
      message: 'Students Progress',
      data: progress,
    };
  }

  @Get('/rank/:id')
  @UseGuards(JwtGuard, new RoleGuard(Role.TEACHER, true))
  async rankings(@Param('id') id: string) {
    const rankings = await this.progressService.subjectRankings(id);

    return {
      message: 'Student rankings',
      data: rankings,
    };
  }
}
