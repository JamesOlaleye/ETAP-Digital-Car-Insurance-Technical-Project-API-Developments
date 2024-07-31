import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Max,
  Min,
  IsInt,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  subjectId: string;

  @IsString()
  @IsOptional()
  videoUrl?: string;
}

export class UploadVideoDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  videoUrl?: string;
}

export class UpdateTopicDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
