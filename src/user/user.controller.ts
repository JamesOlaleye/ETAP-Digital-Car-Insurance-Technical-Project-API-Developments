import {
  Controller,
  Body,
  Get,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Param,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FindUserDto, FindUsersDto, IdDto, UserRoleDto } from 'src/dto';
import { UserRepository } from './user.repository';
import { Role } from '@prisma/client';
import { JwtGuard, RoleGuard } from 'src/auth/guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userRepo: UserRepository,
  ) {}

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async findUser(@Param() dto: FindUserDto, @Query() query: UserRoleDto) {
    console.log(dto);
    query.role ? (dto.role = query.role) : null;
    const user = await this.userService.findUser(dto);

    return {
      message: 'User found',
      data: user,
    };
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async findMany(@Query() dto: FindUsersDto) {
    const users = await this.userService.findUsers(dto);
    const total = await this.userRepo.listCount(dto);

    return {
      message: 'Users found',
      total,
      page: dto.page,
      data: users,
    };
  }

  @Patch('/promote/:id')
  @UseGuards(JwtGuard, new RoleGuard(Role.ADMIN, false))
  async makeTeacher(@Param() dto: IdDto) {
    const teacher = await this.userService.makeTeacher(dto);

    return {
      message: 'Promotion successful',
      data: teacher,
    };
  }
}