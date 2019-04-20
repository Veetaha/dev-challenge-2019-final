import { Module } from '@nestjs/common';
import { CommonModule } from '@modules/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoordCenterUpdate } from './coord-center-update.entity';
import { CoordCenterUpdateRepo } from './coord-center-update.repository';
import { CoordCenterUpdateService } from './coord-center-update.service';

const publicServices = [CoordCenterUpdateService];

@Module({
    imports: [
        CommonModule,
        TypeOrmModule.forFeature([CoordCenterUpdate, CoordCenterUpdateRepo])
    ],
    providers: publicServices,
    exports: publicServices
}) 
export class CoordCenterUpdateModule {}
