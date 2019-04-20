import 'passport';
import * as Express from 'express';

import * as I from '@app/interfaces';
import { User } from '@modules/user';

export interface ResolveContext {
    user?: I.Nullable<User>;
}

export interface GetContextOpts {
    req: Express.Request;
    res: Express.Response;
}

export function getResolveContext({ req: {user} }: GetContextOpts): ResolveContext {
    return { user };
}