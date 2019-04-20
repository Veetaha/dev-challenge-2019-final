import { InputType, Field } from "type-graphql";

import * as I from '@app/interfaces';
import { AbstractFilterInput } from './abstract-filter-input';


const NullableDateField      = Field(_type => Date,   {nullable: true});
const NullableDateArrayField = Field(_type => [Date], {nullable: true});

/**
 * Filter input parameters for `Date` type.
 */
@InputType()
export class DateFilterInput extends AbstractFilterInput {
    @NullableDateField      eq!:  I.Nullable<Date>;
    @NullableDateField      neq!: I.Nullable<Date>;
    @NullableDateField      geq!: I.Nullable<Date>;
    @NullableDateField      leq!: I.Nullable<Date>;
    @NullableDateField      gt!:  I.Nullable<Date>;
    @NullableDateField      lt!:  I.Nullable<Date>;
    @NullableDateArrayField in!:  I.Nullable<Date[]>;
    @NullableDateArrayField nin!: I.Nullable<Date[]>;
}