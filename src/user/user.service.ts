import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { FindUserDto, FindUsersDto, IdDto } from 'src/dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async findUser(dto: FindUserDto) {
    return await this.userRepo.findOne(dto);
  }

  async viewProfile(id: string) {
    const args = new FindUserDto();
    args.id = id;

    return await this.userRepo.findOne(args);
  }

  async findUsers(dto: FindUsersDto) {
    return await this.userRepo.findMany(dto);
  }

  async makeTeacher(dto: IdDto) {
    return await this.userRepo.makeTeacher(dto.id);
  }
}
