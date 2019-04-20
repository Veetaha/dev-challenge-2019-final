import { Module } from '@nestjs/common';

import { MathService         } from './math/math.service';
import { DebugService        } from './debug/debug.service';
import { LoggerService       } from './logger/logger.service';
import { EnvService          } from './env/env.service';
import { WorkflowService     } from './workflow/workflow.service';
import { AlgorithmsService   } from './algorithms/algorithms.service';
import { OrmUtilsService     } from './orm-utils/orm-utils.service';
import { GraphqlUtilsService } from './graphql/graphql-utils.service';

const exposedServices =  [
    LoggerService,
    DebugService,
    EnvService,
    AlgorithmsService,
    MathService,
    WorkflowService,
    OrmUtilsService,
    GraphqlUtilsService
];

@Module({
    providers: exposedServices,
    exports:   exposedServices
})
export class UtilsModule {

}
