import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Max,
  Min,
  IsInt,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  teacherId?: string;
}

export class AssignTeacherDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  teacherId: string;
}
export class FindSubjectsDto {
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsInt()
  @Min(1)
  @IsOptional()
  page: number = 1;

  @Transform(({ value }) => (value ? Number(value) : 20))
  @IsOptional()
  @Min(1)
  @Max(100)
  limit: number = 20;
}
