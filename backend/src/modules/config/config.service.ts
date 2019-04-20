import * as Path from 'path';
import * as Dotenv from 'dotenv';
import * as Joi from 'typesafe-joi';
import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';

import { EnvService } from '@modules/utils';
import { getResolveContext } from '@app/modules/common/resolve-context';



Dotenv.config();

@Injectable()
export class ConfigService
implements TypeOrmOptionsFactory, GqlOptionsFactory, JwtOptionsFactory {

    readonly passwordSalt         = this.env.readEnvOrFail('PASSWORD_SALT');
    readonly port                 = this.env.readPortFromEnvOrFail('PORT');
    readonly frontendPublicDir    = this.pathFromRoot('frontend/dist/frontend');
    readonly defaultUserAvatarUrl = 'default ava url';

    constructor(
        private readonly env: EnvService
    ) {}

    pathFromRoot(...pathParts: string[]) {        
        return Path.normalize(Path.join(__dirname, '../../../../', ...pathParts));
    }

    createGqlOptions(): GqlModuleOptions {
        return {
            playground:     true,
            autoSchemaFile: this.pathFromRoot('common/schema.graphql'),
            introspection:  true,
            path:           '/graphql',
            context:        getResolveContext
        };
    }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {   
            logging:     true,
            type:        'postgres',
            port:        this.env.readPortFromEnvOrFail('DB_PORT'),
            host:        this.env.readEnvOrFail('DB_HOST'),
            username:    this.env.readEnvOrFail('DB_USER'),
            password:    this.env.readEnvOrFail('DB_PASSWORD'),
            database:    this.env.readEnvOrFail('DB_DB'),
            entities:   [this.pathFromRoot('backend/src/modules/**/*.entity.ts')],
            synchronize: true,
        };
    }

    createJwtOptions(): JwtModuleOptions {
        const jwtKeypair = this.env.parseFileSyncOrThrow(
            this.pathFromRoot('backend/.rsa-keypair.json'),
            Joi.object({
                private: Joi.string().required(),
                public:  Joi.string().required()
            }).required()
        );
        return {
            publicKey:          jwtKeypair.public,
            secretOrPrivateKey: jwtKeypair.private,
            signOptions: {
                algorithm: 'RS256',
                expiresIn: '7d',
            }
        };
    }
}
