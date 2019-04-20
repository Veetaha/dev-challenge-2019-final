import _ from 'lodash';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

import * as I from '@app/interfaces';
import { InputType, Field } from 'type-graphql';
import { AbstractFilterInput } from './abstract-filter-input';
import { FilterInput } from './filter-input.interface';
import { getRepository } from 'typeorm';

export type FilterMetadata<TObj extends I.Obj> = I.MapValues<TObj, ColumnMetadata>;

export function FilterObjectInput
<TEntityClass extends I.Class<FilterInput>>
(EntityClass: TEntityClass) {

    type TEntity = InstanceType<TEntityClass>;
    type TMeta   = FilterMetadata<TEntity>;

    @InputType({ isAbstract: true })
    abstract class GenericFilterObjectInput extends AbstractFilterInput {
        private static readonly columnsMetadata = getRepository(EntityClass)
            .metadata
            .columns
            .reduce((acc, meta) => ((acc[meta.propertyName] = meta), acc), {} as TMeta);

        @Field(_type => EntityClass)
        props!: TEntity;
        
        getColumnsMetadata() {
            return GenericFilterObjectInput.columnsMetadata;
        }
    }

    return GenericFilterObjectInput;
}

export type FilterObjectInput = I.InstanceType<ReturnType<typeof FilterObjectInput>>;