import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { RegisterDto, LoginDto } from 'src/dto';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    readonly prisma: PrismaService,
    readonly config: ConfigService,
    readonly jwt: JwtService,
  ) {}

  adminSecret = this.config.get('ADMIN_SECRET');
  jwtSecret = this.config.get('JWT_SECRET');
  expiresIn = this.config.get('JWT_EXPIRES_IN');

  async register(dto: RegisterDto) {
    const { adminKey, ...data } = dto;

    const existing = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new ConflictException('User already exists');
    }
    if (adminKey && adminKey !== this.adminSecret) {
      throw new ForbiddenException('Invalid admin key');
    }
    const password = await argon.hash(data.password);
    if (adminKey) {
      const user = await this.prisma.user.create({
        data: {
          ...data,
          role: Role.ADMIN,
          password,
        },
      });

      return user;
    }

    return await this.prisma.user.create({
      data: {
        ...data,
        password,
      },
    });
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Invalid Credentials');
    }

    const match = await argon.verify(user.password, password);

    if (!match) {
      throw new ForbiddenException('Invalid Credentials');
    }

    const token = this.generateToken({ id: user.id, role: user.role });

    return { user, token };
  }

  generateToken(payload: { id: string; role: Role }) {
    const secret = this.jwtSecret;
    const expiresIn = this.expiresIn;
    return this.jwt.sign(payload, { secret, expiresIn });
  }
}
