import { Injectable } from '@nestjs/common';
import { SubjectRepository } from './subject.repository';
import {
  CreateSubjectDto,
  AssignTeacherDto,
  IdDto,
  FindSubjectsDto,
} from 'src/dto';
import { ReqUser } from 'src/types';

@Injectable()
export class SubjectService {
  constructor(private readonly subjectRepo: SubjectRepository) {}

  async create(dto: CreateSubjectDto) {
    return await this.subjectRepo.createSubject(dto);
  }

  async assignTeacher(dto: AssignTeacherDto) {
    return await this.subjectRepo.assignTeacher(dto);
  }

  async findOne(id: string) {
    return await this.subjectRepo.findOne(id);
  }

  async findMany(dto: FindSubjectsDto) {
    return await this.subjectRepo.findMany(dto);
  }

  async enroll(user: ReqUser, dto: IdDto) {
    return await this.subjectRepo.enroll(user, dto);
  }
}