import { Module } from '@nestjs/common';

import { CommonModule } from '@modules/common';
import { SpaceRouteService } from './space-route.service';




const services = [
    SpaceRouteService
];

@Module({
    imports: [
        CommonModule
    ],
    providers: services,
    exports:   services
})
export class SpaceRouteModule {}
