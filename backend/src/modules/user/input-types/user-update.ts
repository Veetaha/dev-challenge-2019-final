import { InputType, Field } from 'type-graphql';
import { ValidateIf } from 'class-validator';

import * as I from '@app/interfaces';
import { User, UserRole } from '@modules/user';
import { StringLength   } from '@modules/utils';
import { ValidateIfPresent } from '@app/modules/utils';



@InputType()
export class UserUpdateInput {

    @StringLength(User.limits.login)
    @Field()
    login!: string;

    @Field(_type => UserRole, { nullable: true })
    role?: UserRole;

    @StringLength(User.limits.name)
    @ValidateIfPresent
    @Field(_type => String, { nullable: true })  
    name?: I.Nullable<string>;

    @StringLength(User.limits.avatarUrl)
    @ValidateIfPresent
    @Field(_type => String, { nullable: true })
    avatarUrl?: I.Nullable<string>;
}