import { InputType, Field, Int } from 'type-graphql';
import { Min, Max } from 'class-validator';

import * as I from '@app/interfaces';

export interface PaginationParamsInputOpts {
    minLimit?: number;
    maxLimit?: number;
}

export function PaginationParamsInput({
    minLimit = 0,
    maxLimit = 500
}: PaginationParamsInputOpts) {

    @InputType({ isAbstract: true })
    abstract class GenericPaginationParamsInput {

        @Max(maxLimit)
        @Min(minLimit)
        @Field(_type => Int)
        limit!: number;

        @Min(0)
        @Field(_type => Int)
        offset!: number;
    }

    return GenericPaginationParamsInput;
}
export type PaginationParamsInput = I.InstanceType<ReturnType<typeof PaginationParamsInput>>;