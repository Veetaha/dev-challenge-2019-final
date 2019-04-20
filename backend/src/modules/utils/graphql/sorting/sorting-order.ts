import { registerEnumType } from "type-graphql";

import * as I from '@app/interfaces';

export enum SortingOrder {
    Asc  = 'Asc',
    Desc = 'Desc'
}

registerEnumType(SortingOrder, {
    name:        'SortingOrder', 
    description: 'Defines ascending or descending order for sorting items.'
});

export type SortInputType<
    TObjType extends I.Obj
> = Partial<I.DeepMapValues<I.DeepNonNullable<TObjType>, SortingOrder>>;