import _ from 'lodash';
import { Injectable } from '@nestjs/common';

import * as I from '@app/interfaces';
import { FilterBuilder } from './filtering/filter-builder';
import { FilterObjectInput } from './filtering/filter-object-input';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

@Injectable()
export class GraphqlUtilsService {

    getFilterParams(filterInput: FilterObjectInput) {
        return FilterBuilder.createFilterParams(filterInput);
    }

    removeInvalidProps
    <TEntityClass extends I.Class>
    (entityUpdate: I.DeepNullable<InstanceType<TEntityClass>>, EntityClass: TEntityClass) {
        const metadata = getRepository(EntityClass).metadata.columns.forEach(column => {
            if (column.propertyName in entityUpdate) {
                getRepository(EntityClass).update()
            }
        });


    }

}