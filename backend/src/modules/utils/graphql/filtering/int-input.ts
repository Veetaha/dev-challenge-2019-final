import { InputType, Field, Int } from "type-graphql";

import * as I from '@app/interfaces';
import { AbstractFilterInput } from './abstract-filter-input';

const NullableIntField      = Field(_type => Int,   {nullable: true});
const NullableIntArrayField = Field(_type => [Int], {nullable: true});

/**
 * Filter input parameters for `Int` type.
 */
@InputType()
export class IntFilterInput extends AbstractFilterInput {
    @NullableIntField      eq!:  I.Nullable<number>;
    @NullableIntField      neq!: I.Nullable<number>;
    @NullableIntField      geq!: I.Nullable<number>;
    @NullableIntField      leq!: I.Nullable<number>;
    @NullableIntField      gt!:  I.Nullable<number>;
    @NullableIntField      lt!:  I.Nullable<number>;
    @NullableIntArrayField in!:  I.Nullable<number[]>;
    @NullableIntArrayField nin!: I.Nullable<number[]>;
}