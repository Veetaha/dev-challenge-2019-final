import { Ctx } from 'type-graphql';

/**
 * Injects user from context into the parameter.
 */
export const Client = Ctx('req.user');
