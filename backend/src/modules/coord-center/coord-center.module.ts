import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { SpaceRouteModule    } from '@modules/space-route';
import { CommonModule        } from '@modules/common';
import { CoordCenterService  } from './coord-center.service';
import { CoordCenter         } from './coord-center.entity';
import { CoordCenterRepo     } from './coord-center.repository';
import { CoordCenterResolver } from './coord-center.resolver';


const publicServices = [CoordCenterService, CoordCenterResolver];

@Module({
    imports: [
        CommonModule,
        SpaceRouteModule,
        TypeOrmModule.forFeature([CoordCenter, CoordCenterRepo])
    ],
    providers: publicServices,
    exports:   publicServices
})
export class CoordCenterModule {}
