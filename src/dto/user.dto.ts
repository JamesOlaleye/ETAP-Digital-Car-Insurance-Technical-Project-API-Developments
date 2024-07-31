import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Max,
  Min,
  IsInt,
  IsEnum,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Role } from '@prisma/client';

export class FindUserDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}

export class UserRoleDto {
  @IsString()
  @IsOptional()
  role?: Role;
}

export class FindUsersDto {
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

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

export class IdDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
