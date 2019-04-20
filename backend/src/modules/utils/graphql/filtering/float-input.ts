import { InputType, Field, Float } from "type-graphql";

import * as I from '@app/interfaces';
import { AbstractFilterInput } from './abstract-filter-input';

const NullableFloatField      = Field(_type => Float,   {nullable: true});
const NullableFloatArrayField = Field(_type => [Float], {nullable: true});

/**
 * Filter input parameters for `Float` type.
 */
@InputType()
export class FloatFilterInput extends AbstractFilterInput {
    @NullableFloatField      eq?:  I.Nullable<number>;
    @NullableFloatField      neq?: I.Nullable<number>;
    @NullableFloatField      geq?: I.Nullable<number>;
    @NullableFloatField      leq?: I.Nullable<number>;
    @NullableFloatField      gt?:  I.Nullable<number>;
    @NullableFloatField      lt?:  I.Nullable<number>;
    @NullableFloatArrayField in?:  I.Nullable<number[]>;
    @NullableFloatArrayField nin?: I.Nullable<number[]>;
}