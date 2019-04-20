import { InputType, Field } from "type-graphql";

import * as I from '@app/interfaces';
import { AbstractFilterInput } from './abstract-filter-input';

/**
 * Filter input parameters for `Enum` type.
 * @param EnumObj Enum object that contains target enum values, often it is 
 *                an original TypeScript enum.
 */
export function EnumFilterInput<TEnum extends I.Obj<any>>(EnumObj: TEnum) {
    type TEnumValue = I.ValueOf<TEnum>;

    const NullableEnumField      = Field(_type => EnumObj,   {nullable: true});
    const NullableEnumArrayField = Field(_type => [EnumObj], {nullable: true});

    @InputType()
    abstract class GenericEnumFilterIntput extends AbstractFilterInput {
        @NullableEnumField      eq?:  I.Nullable<TEnumValue>;
        @NullableEnumField      neq?: I.Nullable<TEnumValue>;
        @NullableEnumArrayField in?:  I.Nullable<TEnumValue[]>;
        @NullableEnumArrayField nin?: I.Nullable<TEnumValue[]>;    
    }
    return GenericEnumFilterIntput;
}

export type EnumFilterInput = I.InstanceType<ReturnType<typeof EnumFilterInput>>;