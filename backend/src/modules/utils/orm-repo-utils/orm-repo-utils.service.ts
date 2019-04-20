import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import * as I from '@app/interfaces';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class OrmRepoUtilsService {

    constructor(
        private readonly log: LoggerService
    ) {}

    /**
     * Removes properties that are defined as required in `TypeOrm.Entity`, but
     * are `null | undefined` in `obj`. This method mutates `obj` and returns it.
     * 
     * @param repo Target entity repository.
     * @param obj  Target object to remove properties from.
     * 
     * 
     */
    removeNilFromRequiredProps
    <TObj extends I.Obj>
    (repo: Repository<I.Obj>, obj: TObj): Partial<TObj> {

        this.log.info(repo.metadata.columns, `Columns metadata:`);

        for (const {propertyName, isNullable} of repo.metadata.columns) {
            if (!isNullable && obj[propertyName] == null) {   
                delete obj[propertyName];
            }
        }
        return obj;
    }


}