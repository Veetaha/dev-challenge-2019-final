import { ObjectType, Field } from 'type-graphql';

import { User } from '../user.entity';

@ObjectType()
export class UserAndToken {
    @Field()
    user!: User;

    @Field()
    jwt!: string;

    constructor(data: UserAndToken) {
        Object.assign(this, data);
    }
}