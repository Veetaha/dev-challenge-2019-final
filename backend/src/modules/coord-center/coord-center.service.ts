import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, OnModuleInit } from '@nestjs/common';

import { ConfigService            } from '@modules/config';
import { PaginationParamsInput    } from '@modules/utils';
import { SpaceRouteService        } from '@modules/space-route';
import { CreateCoordCenterInput   } from './create-coord-center.gql-input';
import { CoordCenterRepo          } from './coord-center.repository';
import { GetRouteToSectorResponse } from './get-route-to-sector-response.gql-obj';
import { CoordCenter              } from './coord-center.entity';
import { GetCoordCentersResponse  } from './get-coord-centers-response.gql-obj';



@Injectable()
export class CoordCenterService implements OnModuleInit {

    constructor(
        @InjectRepository(CoordCenterRepo)
        private readonly repo: CoordCenterRepo,
        private readonly config: ConfigService,
        private readonly spaceRoutes: SpaceRouteService
    ) {}

    async onModuleInit() {
        const total = await this.repo.count();
        if (total > 0) {
            return;
        }
        await this.repo.save([
            {id: 0, beginSector: 400, endSector: 500},
            {id: 1, beginSector: 0,   endSector: 100},
            {id: 2, beginSector: 100, endSector: 200},
            {id: 3, beginSector: 200, endSector: 300},
            {id: 4, beginSector: 300, endSector: 400},
        ]);
    }

    async createCoordCenter(input: CreateCoordCenterInput) {
        await this.repo.ensureNoIdOrBeginSectorExistsOrFail(input.id, input.sector);
        const owningSector = await this.repo.getBySector(input.sector);
        if (owningSector == null) { // case when database is empty
            return this.repo.save({
                id: input.id,
                beginSector: 0,
                endSector: this.config.totalSectors
            });
        }
        // @FIXME should we wrap these two queries with Promise.all()
        // Or use plain this.repo.query() to do both queries simultaneously
        await this.repo.update(owningSector.id, {  
            endSector: input.sector
        });
        return this.repo.save({
            id: input.id,
            beginSector: input.sector,
            endSector: owningSector.endSector
        });
    }

    async deleteCoordCenter(id: number) {
        const { prev, target, next } = await this.repo.getAdjacentOrFail(id);
        // case there is only one coordination center in the database
        if (next == null || prev == null) { 
            await this.repo.remove(target);
            return true;
        }
        return prev == null || 
            Math.max(target.id, next.id, prev.id) === next.id ||
            next.id < prev.id ?
            this.deleteAndUseNextCenter(target, next) :
            this.deleteAndUsePrevCenter(target, prev);
            
    }

    private async deleteAndUsePrevCenter(target: CoordCenter, prev: CoordCenter) {
        prev.endSector = target.endSector;
        await Promise.all([this.repo.save(prev), this.repo.remove(target)]);
        return true;
    }
    private async deleteAndUseNextCenter(target: CoordCenter, next: CoordCenter) {
        next.beginSector = target.beginSector;
        await Promise.all([this.repo.save(next), this.repo.remove(target)]);
        return true;
    }


    async getRoutesToSectorOrFail(sector: number) {
        const coordinationCenter = await this.repo.getIdBySectorOrFail(sector);
        return new GetRouteToSectorResponse({
            coordinationCenter,
            routes: this.spaceRoutes.getRoutes(sector)
        });
    }

    async getCoordCenters(pageParams: PaginationParamsInput) {
        const [data, total] = await this.repo.getCoordCenters(pageParams);
        return new GetCoordCentersResponse({ data, total });
    }
}