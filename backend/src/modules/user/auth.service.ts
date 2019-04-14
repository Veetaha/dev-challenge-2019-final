import * as Joi from 'typesafe-joi';
import * as Crypto from 'crypto';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import * as I from '@app/interfaces';
import { ConfigService } from '@modules/config';
import { UserRepo } from './user.repository';
import { Credentials } from './input-types/credentials';
import { UserAndToken } from './object-types/user-and-token';
import { SignUpInput } from './input-types/sign-up-input';


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
    async signInOrFail(credentials: Credentials) {
        const user = await this.getByCredentialsOrFail(credentials);
        const payload: I.JwtPayload = { sub: user.login };
        return new UserAndToken({
            user,
            jwt: this.jwt.sign(payload)
        });
    }

    private async getByCredentialsOrFail({ login, password }: Credentials) {
        return this.repo.getByHashedCredentialsOrFail({ 
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
    async getUserByJwtPayload(payload: unknown) {
        return this.repo.findOne(
            Joi.attempt(
                payload, 
                I.JwtPayloadSchema, 
                new ForbiddenException('invlaid JWT bearer token')
            ).sub
        );
    }

    async signUp({ credentials: {login, password}, name }: SignUpInput) {
        if ((await this.repo.count({ where: {login} })) > 0) {
            throw new ForbiddenException(`Login '${login}' is already taken.`);
        }
        const user = await this.repo.save({
            login,
            passwordHash: this.getPasswordHash(password),
            name
        });

        const jwtPayload: I.JwtPayload = { sub: user.login };
        return new UserAndToken({
            user,
            jwt: this.jwt.sign(jwtPayload)
        });
    }


}
