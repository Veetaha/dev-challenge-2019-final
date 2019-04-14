import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@modules/config';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { UserResolver } from './user.resolver';
import { User } from './user.entity';
import { UserRepo } from './user.repository';
import { CommonModule } from '../common/common.module';

@Module({
    imports: [
        CommonModule,
        JwtModule.registerAsync(ConfigModule.asyncOptsProvider),
        TypeOrmModule.forFeature([User, UserRepo])
    ],
    providers: [UserService, AuthService, UserResolver]
})
export class UserModule {}
