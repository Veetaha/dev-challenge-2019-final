import * as Path from 'path';
import * as Dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';

import { EnvService } from '@modules/utils';


Dotenv.config();

@Injectable()
export class ConfigService implements TypeOrmOptionsFactory, GqlOptionsFactory {

    constructor(
        private readonly env: EnvService
    ) {}
    
    port                  = this.env.readPortFromEnvOrFail('PORT');
    frontendPublicDir     = this.pathFromRoot('frontend/dist/frontend');

    pathFromRoot(...pathParts: string[]) {        
        return Path.normalize(Path.join(__dirname, '../../../../', ...pathParts));
    }

    createGqlOptions(): GqlModuleOptions {
        return {
            playground:     true,
            autoSchemaFile: this.pathFromRoot('common/schema.graphql'),
            introspection:  true,
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
            synchronize: true
        };
    }
}
