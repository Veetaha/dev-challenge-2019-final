import * as Http from 'http';
import { FastifyReply } from 'fastify';

import * as I from '@common/interfaces';
export * from '@common/interfaces';

export type CoreEntityData<TEntity extends I.Obj> = I.CoreObjData<
    I.RemoveKeys<TEntity, 'id' | 'creationDate' | 'lastUpdateDate'>
>;



export type Response = FastifyReply<Http.ServerResponse>;