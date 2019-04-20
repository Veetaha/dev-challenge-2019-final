import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserRole } from './user-role.enum';
import { ResolveContext } from '../common';


@Injectable()
export class AuthGuard implements CanActivate {
    private readonly roles: Set<UserRole>;
    constructor(roles: UserRole[]) {
        this.roles = new Set(roles);
    }


    canActivate(context: ExecutionContext) {
        const {req: {user}}: ResolveContext = GqlExecutionContext.create(context).getContext();
        return user != null && (this.roles.size === 0 || this.roles.has(user.role));
    }
}