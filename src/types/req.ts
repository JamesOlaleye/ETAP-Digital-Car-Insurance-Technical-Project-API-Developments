import { Role } from '@prisma/client';

export interface ReqUser {
  id: string;
  role: Role;
}