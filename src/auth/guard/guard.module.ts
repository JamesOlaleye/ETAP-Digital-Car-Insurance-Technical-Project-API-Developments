import { Module, Global } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from './guard';
import { RoleGuard } from './role.guard';

@Global()
@Module({
  providers: [JwtGuard, RoleGuard, JwtService, String, Boolean],
  exports: [JwtGuard, RoleGuard, JwtService],
})
export class GuardModule {}