import { PaginationParamsInput as GenericPaginationParamsInput } from '../utils';
import { InputType } from 'type-graphql';

@InputType()
export class PaginationParamsInput 
extends GenericPaginationParamsInput({ minLimit: 0, maxLimit: 500 }) {}