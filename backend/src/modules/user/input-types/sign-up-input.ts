import { InputType, Field } from 'type-graphql';

import { User } from '@modules/user';
import { StringLength } from '@modules/utils/decorators/string-length.decorator';
import { Credentials } from './credentials';


@InputType()
export class SignUpInput {
    @Field()
    credentials!: Credentials;

    @Field()
    @StringLength(User.limits.name)
    name!: string;
}