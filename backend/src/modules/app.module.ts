import { Module } from '@nestjs/common';
import { CommonModule            } from './common/common.module';
import { UserModule              } from './user/user.module';
import { CoordCenterUpdateModule } from './coord-center-update';
import { SpaceRouteModule        } from './space-route';
import { CoordCenterModule       } from './coord-center';





@Module({
    imports: [
        CommonModule,
        UserModule,
        SpaceRouteModule,
        CoordCenterUpdateModule,
        CoordCenterModule
    ]
})
export class AppModule {}
