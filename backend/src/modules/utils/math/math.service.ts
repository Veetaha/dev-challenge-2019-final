import { Injectable } from '@nestjs/common';
import { IntegerRange } from './integer-range.class';
import { AlgorithmsService } from '@modules/utils/algorithms/algorithms.service';
import { DebugService } from '@modules/utils/debug/debug.service';

@Injectable()
export class MathService  {
    
    constructor(
        debug: DebugService,
        algo:  AlgorithmsService
    ) {
        IntegerRange.init(debug, algo);
    }


    makeIntegerRange(...args: ConstructorParameters<typeof IntegerRange>) {
        return new IntegerRange(...args);
    }

}
