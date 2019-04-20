import { ObjectType, Field, Int } from 'type-graphql';

import { SpaceRoute } from '@modules/space-route';
import { CopyConstructable } from '../utils/objects/copy-constructable';

@ObjectType()
export class GetRouteToSectorResponse extends CopyConstructable<GetRouteToSectorResponse> {

    @Field(_type => Int)
    coordinationCenter!: number;

    @Field(_type => [SpaceRoute])
    routes!: SpaceRoute[];
}
