import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { GuardModule } from './auth/guard/guard.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { v2 as cloudinary } from 'cloudinary';
import { UserModule } from './user/user.module';
import { SubjectModule } from './subject/subject.module';
import { TopicModule } from './topic/topic.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    PrismaModule,
    GuardModule,
    AuthModule,
    CloudinaryModule,
    UserModule,
    SubjectModule,
    TopicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_KEY,
      api_secret: process.env.CLOUD_SECRET,
    });
  }
}
