import { InputType, Field } from "type-graphql";

import * as I from '@app/interfaces';
import { AbstractFilterInput } from './abstract-filter-input';


const NullableBooleanField = Field(_type => Boolean, {nullable: true});

/**
 * Filter input parameters for `Boolean` type.
 */
@InputType()
export class BooleanFilterInput extends AbstractFilterInput<boolean> {
    @NullableBooleanField eq?:  I.Nullable<boolean>;
    @NullableBooleanField neq?: I.Nullable<boolean>;
}
