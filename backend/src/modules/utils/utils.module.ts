import { Module } from '@nestjs/common';
import { DebugService  } from './debug/debug.service';
import { LoggerService } from './logger/logger.service';
import { EnvService    } from './env/env.service';
import { AlgorithmsService  } from './algorithms/algorithms.service';
import { MathService } from './math/math.service';
import { MetaService } from './meta/meta.service';
import { WorkflowService } from './workflow/workflow.service';

export { DebugService  } from './debug/debug.service';
export { LoggerService } from './logger/logger.service';
export { EnvService    } from './env/env.service';
export { AlgorithmsService  } from './algorithms/algorithms.service';
export { MathService } from './math/math.service';
export { MetaService } from './meta/meta.service';
export { WorkflowService } from './workflow/workflow.service';

const services =  [
    LoggerService,
    DebugService,
    EnvService,
    AlgorithmsService,
    MathService,
    MetaService,
    WorkflowService
];

@Module({
    providers: services,
    exports:   services
})
export class UtilsModule {

}
