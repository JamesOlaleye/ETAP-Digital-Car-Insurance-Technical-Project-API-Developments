import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { ConfigService } from '@nestjs/config';
  import { Role } from '@prisma/client';
  
  interface PayloadReturn {
    iat: number;
    exp: number;
  }
  
  interface RegKeyReturn extends PayloadReturn {
    id: string;
    role: Role;
  }
  
  @Injectable()
  export class JwtGuard implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private config: ConfigService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
  
      const token = request.headers['authorization'];
  
      if (!token) {
        throw new ForbiddenException('Unauthorized');
      }
  
      const secret = this.config.get('JWT_SECRET');
  
      try {
        const decoded = this.jwtService.verify(token.split(' ')[1], {
          secret,
        }) as RegKeyReturn;
        request.user = decoded;
        return true;
      } catch (err) {
        console.error(err);
        console.error('Did not resolve token');
        throw new ForbiddenException('Unauthorized');
      }
    }
  }