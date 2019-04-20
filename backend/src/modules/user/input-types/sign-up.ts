import { InputType, Field } from 'type-graphql';

import { User } from '@modules/user';
import { StringLength } from '@app/modules/utils/validation-decorators/string-length.decorator';
import { CredentialsInput } from './credentials';

@InputType()
class NestedInput {
    @Field() 
    str!: string;
}

@InputType()
export class SignUpInput {
    @Field()
    credentials!: CredentialsInput;

    @Field()
    @StringLength(User.limits.name)
    name!: string;

    @Field()
    nested!: NestedInput;
}
