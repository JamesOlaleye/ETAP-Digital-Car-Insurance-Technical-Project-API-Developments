import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  
  import { Role } from '@prisma/client';
  
  @Injectable()
  export class RoleGuard implements CanActivate {
    constructor(
      private requiredRole: Role,
      private allStaff: boolean,
    ) {}
  
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const userRole = request.user?.role;
  
      if (!request.user) {
        throw new UnauthorizedException('Unauthorized');
      }
  
      if (this.allStaff && userRole !== Role.STUDENT) {
        return true;
      }
  
      if (userRole !== this.requiredRole) {
        throw new UnauthorizedException('Unauthorized');
      }
  
      return true;
    }
  }