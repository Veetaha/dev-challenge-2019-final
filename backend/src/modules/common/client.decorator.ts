import { Ctx } from 'type-graphql';
import { ResolveContext } from '@app/modules/common/resolve-context';

const ctxUserProp: keyof ResolveContext = 'user';
/**
 * Injects user from context into the parameter.
 */
export const Client = Ctx(ctxUserProp);
