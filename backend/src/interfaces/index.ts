import * as I from '@common/interfaces';
import { User } from '@modules/user';

export * from '@common/interfaces';

export type CoreEntityData<TEntity extends I.Obj> = I.CoreObjData<
    I.RemoveKeys<TEntity, 'id' | 'creationDate' | 'lastUpdateDate'>
>;



export interface ResoveContext {
    readonly user?: I.Nullable<User>;
}
