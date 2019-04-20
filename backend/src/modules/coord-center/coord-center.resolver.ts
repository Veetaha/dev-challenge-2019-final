import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

import { PaginationParamsInput    } from '@modules/common';
import { CoordCenter              } from './coord-center.entity';
import { CoordCenterService       } from './coord-center.service';
import { CreateCoordCenterInput   } from './create-coord-center.gql-input';
import { GetRouteToSectorResponse } from './get-route-to-sector-response.gql-obj';
import { GetCoordCentersResponse  } from './get-coord-centers-response.gql-obj';
import { GetRoutesToSectorInput } from './get-routes-to-sector.gql-input';
import { CoordCenterIdArgs } from './coord-center-id.gql-args';
import { Auth } from '../user/auth.decorator';



@Resolver(CoordCenter)
export class CoordCenterResolver {

    constructor(
        private readonly coordCenters: CoordCenterService
    ) {}

    @Auth()
    @Mutation(_returns => CoordCenter)
    async createCoordCenter(@Args('input') input: CreateCoordCenterInput) {
        return this.coordCenters.createCoordCenter(input);
    }

    @Auth()
    @Mutation(_returns => Boolean)
    async deleteCoordCenter(@Args() {id}: CoordCenterIdArgs) {
        return this.coordCenters.deleteCoordCenter(id);
    }

    @Auth()
    @Query(_returns => GetRouteToSectorResponse)
    async getRoutesToSector(@Args('input') {sector}: GetRoutesToSectorInput) {
        return this.coordCenters.getRoutesToSectorOrFail(sector);
    }

    @Auth()
    @Query(_returns => GetCoordCentersResponse)
    async getCoordCenters(@Args('pageParams') pageParams: PaginationParamsInput) {
        return this.coordCenters.getCoordCenters(pageParams);
    }
}