import { Mutation, Resolver, Query, ResolveProperty, Args, Root } from '@nestjs/graphql';

import { ConfigService } from '@modules/config';
import { User } from './user.entity';
import { Credentials } from './input-types/credentials';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { UserAndToken } from './object-types/user-and-token';
import { SignUpInput } from './input-types/sign-up-input';



@Resolver(User)
export class UserResolver {
    constructor(
        private readonly config: ConfigService,
        private readonly auth:  AuthService,
        private readonly users: UserService
    ) {}

    @ResolveProperty()
    avatarUrl(@Root() user: User) {
        return user.avatarUrl || this.config.defaultUserAvatarUrl;
    }
 
    @Mutation(_returns => UserAndToken)
    async signIn(@Args('credentials') credentials: Credentials) {
        return this.auth.signInOrFail(credentials);
    }

    @Mutation(_returns => UserAndToken)
    async signUp(@Args('data') data: SignUpInput) {
        return this.auth.signUp(data);
    }

    @Query(_returns => User, { nullable: true })
    async getUserByLogin(@Args('login') login: string) {
        return this.users.getByLogin(login);
    }

}