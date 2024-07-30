import { Controller, Post, HttpStatus, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from 'src/dto';

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}
  @Post('register')
  @HttpCode(201)
  async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto);

    return {
      message: 'Registration Successful',
      user,
    };
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const res = await this.authService.login(dto);

    return {
      message: 'Login Successful',
      ...res,
    };
  }
}