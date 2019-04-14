import * as I from '@app/interfaces';
import { User } from '@modules/user';

export interface ResolveContext {
    user?: I.Nullable<User>;
}