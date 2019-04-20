import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy as PassportJwtStrategy } from 'passport-jwt';

import { ConfigService } from '@modules/config';
import { AuthService } from './auth.service';




@Injectable()                    // tslint:disable-next-line: no-inferred-empty-object-type
export class JwtStrategy extends PassportStrategy(PassportJwtStrategy) {
    constructor(
        private readonly auth: AuthService,
        config: ConfigService
    ) {
        super({  
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.jwtKeypair.private,
            algorithms: ['RS256']
        });
    }

    async validate(payload: unknown) {
        const user = await this.auth.getByJwtPayload(payload);
        if (user == null) {
            throw new UnauthorizedException;
        }
        return user;
    }
}