import { ObjectType, Field, Int } from 'type-graphql';
import { Min } from 'class-validator';

import * as I from '@app/interfaces';
import { CopyConstructable } from '../../objects/copy-constructable';

/**
 * Creates an abstract class that is decorated with `@ObjectType()` that 
 * defines a generic type for pagination response. Extend it to instantiate
 * for your needs.
 * 
 * @param ItemClass `@ObjectType()` class that defines the type of page items.
 */
export function Page<TItemClass extends I.Class>(ItemClass: TItemClass) {

    @ObjectType({ isAbstract: true })
    abstract class GenericPage extends CopyConstructable<GenericPage> {
        /**
         * Contains an array of items payload for this page.
         */
        @Field(_type => [ItemClass])
        data!: InstanceType<TItemClass>[];

        /**
         * Total number of items clients can query with this request.
         * It must me an integer that is >= 0.
         */
        @Min(0)
        @Field(_type => Int)
        total!: number;
    }

    return GenericPage;
}
