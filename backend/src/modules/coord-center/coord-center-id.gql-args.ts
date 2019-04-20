import { Min } from 'class-validator';
import { Field, Int, ArgsType } from 'type-graphql';

@ArgsType()
export class CoordCenterIdArgs {
    @Min(0)
    @Field(_type => Int)
    id!: number;
}