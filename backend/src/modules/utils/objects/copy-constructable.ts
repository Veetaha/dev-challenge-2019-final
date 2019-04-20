
import * as I from '@app/interfaces';

export abstract class CopyConstructable<TDerived extends CopyConstructable<any>> {
    constructor(data: I.CoreObjData<TDerived>) {
        Object.assign(this, data);
    }
}