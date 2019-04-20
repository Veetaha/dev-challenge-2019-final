import { ObjectType, Field, Int } from 'type-graphql';
import { CopyConstructable } from '../utils/objects/copy-constructable';

@ObjectType()
export class SpaceRoute extends CopyConstructable<SpaceRoute> {

    @Field({ description: 'Level of danger.' })
    securityLevel!: number;

    @Field(_type => [Int], { description: 'Sequence of gate numbers.' })
    gates!: number[];

}