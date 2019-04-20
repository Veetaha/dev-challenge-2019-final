import { InputType, Field, Int } from 'type-graphql';
import { Min, Max } from 'class-validator';
import { ConfigService } from '../config';

@InputType()
export class GetRoutesToSectorInput {
    @Min(1)
    @Max(ConfigService.totalSectors)
    @Field(_type => Int)
    sector!: number;
}