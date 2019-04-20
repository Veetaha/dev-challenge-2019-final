import { InputType, Field, Int } from 'type-graphql';
import { Min, Max } from 'class-validator';

import * as I from '@app/interfaces';

export interface PaginationParamsInputOpts<TFilterClass extends I.Class> {
    minLimit?: number;
    maxLimit?: number;
    filter:    TFilterClass;
}

export function PaginationParamsInput<TFilterClass extends I.Class>({
    minLimit = 0,
    maxLimit = 500,
    filter
}: PaginationParamsInputOpts<TFilterClass>) {

    @InputType({ isAbstract: true })
    class GenericPaginationParamsInput {

        @Max(maxLimit)
        @Min(minLimit)
        @Field(_type => Int)
        limit!: number;

        @Min(0)
        @Field(_type => Int)
        offset!: number;

        @Field(_type => filter)
        filters!: InstanceType<TFilterClass>;
    }

    return GenericPaginationParamsInput;
}