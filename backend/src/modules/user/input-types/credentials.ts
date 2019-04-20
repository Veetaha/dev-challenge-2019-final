import { InputType, Field } from 'type-graphql';

import * as I from '@app/interfaces';
import { StringLength } from '@app/modules/utils/validation-decorators/string-length.decorator';
import { User } from '../user.entity';

@InputType()
export class CredentialsInput {
    @Field()
    @StringLength(User.limits.login)
    login!: string;

    @Field()
    @StringLength(User.limits.password)
    password!: string;
}


export type HashedCredentials = I.RenameKey<CredentialsInput, 'password', 'passwordHash'>;