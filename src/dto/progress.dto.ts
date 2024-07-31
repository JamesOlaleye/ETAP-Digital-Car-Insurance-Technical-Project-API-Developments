import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Max,
  Min,
  IsInt,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProgressDto {
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @IsString()
  @IsNotEmpty()
  topicId: string;

  @IsString()
  @IsNotEmpty()
  apiKey: string;
}

export class UpdateProgressDto {
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @IsString()
  @IsNotEmpty()
  topicId: string;

  @IsString()
  @IsNotEmpty()
  apiKey: string;

  @IsInt()
  @Min(1)
  @Max(100)
  progress: number;
}
