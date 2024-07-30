import { Express, Request } from 'express';
import { Role } from '@prisma/client';

export type File = Express.Multer.File;

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        role: Role;
      };
    }
  }
}