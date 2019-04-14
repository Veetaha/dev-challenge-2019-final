import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy as PassportJwtStrategy } from 'passport-jwt';

import { AuthService } from './auth.service';



@Injectable()                    // tslint:disable-next-line: no-inferred-empty-object-type
export class JwtStrategy extends PassportStrategy(PassportJwtStrategy) {
    constructor(private readonly auth: AuthService) {
        super({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() });
    }

    async validate(payload: unknown) {
        const user = await this.auth.getUserByJwtPayload(payload);
        if (user == null) {
            throw new UnauthorizedException;
        }
        return user;
    }
}