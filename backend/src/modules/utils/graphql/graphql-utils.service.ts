import _ from 'lodash';
import { Injectable } from '@nestjs/common';

import { FilterBuilder } from './filtering/filter-builder';
import { FilterObjectInput } from './filtering/filter-object-input';


@Injectable()
export class GraphqlUtilsService {

    getFilterParams(filterInput: FilterObjectInput) {
        return FilterBuilder.createFilterParams(filterInput);
    }

}