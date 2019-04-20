import * as I from '@app/interfaces';
import { InputType, Field } from 'type-graphql';
import { FilterUnion } from './filters-union-mode.enum';
import { FilterOperator } from './fitler-operator.enum';

@InputType({ isAbstract: true })
export abstract class AbstractFilterInput<TInputType = unknown> {

    /**
     * Defines the mode to unite all the filter conditions.
     */
    @Field(_type => FilterUnion)
    unionMode?: I.Nullable<FilterUnion>;

    [FilterOperator.Eq   ]?: I.Nullable<TInputType>;
    [FilterOperator.Neq  ]?: I.Nullable<TInputType>;
    [FilterOperator.Gt   ]?: I.Nullable<TInputType>;
    [FilterOperator.Geq  ]?: I.Nullable<TInputType>;
    [FilterOperator.Lt   ]?: I.Nullable<TInputType>;
    [FilterOperator.Leq  ]?: I.Nullable<TInputType>;
    [FilterOperator.Like ]?: I.Nullable<string>;
    [FilterOperator.Nlike]?: I.Nullable<string>;
    [FilterOperator.In   ]?: I.Nullable<TInputType[]>;
    [FilterOperator.Nin  ]?: I.Nullable<TInputType[]>;

}