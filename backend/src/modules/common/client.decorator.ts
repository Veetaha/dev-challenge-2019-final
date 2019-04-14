import { Ctx } from 'type-graphql';
import { ResolveContext } from '@modules/common/resolve-context.interface';

const ctxUserProp: keyof ResolveContext = 'user';
/**
 * Injects user from context into the parameter.
 */
export const Client = Ctx(ctxUserProp);
