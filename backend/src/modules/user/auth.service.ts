import * as Joi from 'typesafe-joi';
import * as Crypto from 'crypto';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import * as I from '@app/interfaces';
import { ConfigService } from '@modules/config';
import { UserRepo } from './user.repository';
import { CredentialsInput } from './input-types/credentials';
import { UserAndToken } from './object-types/user-and-token';
import { SignUpInput } from './input-types/sign-up';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepo)
        private readonly repo:   UserRepo,
        private readonly jwt:    JwtService,
        private readonly config: ConfigService
    ) {}

    /**
     * Returns user its encoded jwt for the given `credentials`.
     * @param param0 Credentials that identify the target user.
     * 
     * @throws `Error` if failed to find user by credentials.
     */
    async signIn(credentials: CredentialsInput) {
        const user = await this.getByCredentials(credentials);
        if (user == null) {
            return null;
        }
        const payload: I.JwtPayload = { sub: user.login };
        return new UserAndToken({
            user,
            jwt: this.jwt.sign(payload)
        });
    }

    private async getByCredentials({ login, password }: CredentialsInput) {
        return this.repo.getByHashedCredentials({ 
            login, 
            passwordHash: this.getPasswordHash(password) 
        });
    }

    private getPasswordHash(password: string) {
        const hash = Crypto.createHmac('sha512', this.config.passwordSalt);
        hash.update(password);
        return hash.digest('hex');
    }   



    /**
     * Returns `User` by jwt payload. Throws if payload is invalid, returns nullish value
     * if no user was found.
     * 
     * @param payload Deserialized jwt payload
     */
    async getByJwtPayload(payload: unknown) {
        return this.repo.getByLogin(
            Joi.attempt(
                payload, 
                I.JwtPayloadSchema, 
                new ForbiddenException('invlaid JWT bearer token')
            ).sub
        );
    }

    async signUpOrFail({ credentials: {login, password}, name }: SignUpInput) {
        if (await this.repo.loginIsTaken(login)) {
            throw new ForbiddenException(`Login '${login}' is already taken.`);
        }
        const user = await this.repo.save({
            login,
            name,
            passwordHash: this.getPasswordHash(password)
        });

        const jwtPayload: I.JwtPayload = { sub: user.login };
        return new UserAndToken({
            user,
            jwt: this.jwt.sign(jwtPayload)
        });
    }


}
