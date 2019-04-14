import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { UtilsModule } from '@modules/utils';
import { ConfigModule } from '@modules/config';
import { TypeOrmModule } from '@nestjs/typeorm';

const reexports = [
    UtilsModule,
    ConfigModule,
    GraphQLModule.forRootAsync(ConfigModule.asyncOptsProvider),
    TypeOrmModule.forRootAsync(ConfigModule.asyncOptsProvider),
];



@Module({
    imports: reexports,
    exports: reexports
})
export class CommonModule {}
