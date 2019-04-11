import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { UtilsModule } from '@modules/utils';
import { ConfigModule, ConfigService } from '@modules/config';
import { TypeOrmModule } from '@nestjs/typeorm';

const configOptionsProvider = { 
    imports:     [ConfigModule], 
    useExisting: ConfigService, 
};

const reexports = [
    UtilsModule,
    ConfigModule,
    GraphQLModule.forRootAsync(configOptionsProvider),
    TypeOrmModule.forRootAsync(configOptionsProvider),
];



@Module({
    imports: reexports,
    exports: reexports
})
export class CommonModule {}
