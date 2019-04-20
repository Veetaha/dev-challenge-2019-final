import { UserRole } from "./user-role.enum";
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { PassportAuthGuard } from './passport-auth.guard';

export const Auth = (...roles: UserRole[]) => UseGuards(
    PassportAuthGuard, new AuthGuard(roles)
);