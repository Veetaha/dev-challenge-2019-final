import { InputType, Field } from "type-graphql";

import * as I from '@app/interfaces';
import { AbstractFilterInput } from './abstract-filter-input';

const NullableStringField      = Field(_type => String,   {nullable: true});
const NullableStringArrayField = Field(_type => [String], {nullable: true});

/**
 * Filter input paramters for `String` type.
 */
@InputType()
export class StringFilterInput extends AbstractFilterInput {
    @NullableStringField      eq?:    I.Nullable<string>;
    @NullableStringField      neq?:   I.Nullable<string>;
    @NullableStringField      like?:  I.Nullable<string>;
    @NullableStringField      nlike?: I.Nullable<string>;
    @NullableStringArrayField in?:    I.Nullable<string[]>;
    @NullableStringArrayField nin?:   I.Nullable<string[]>;
}