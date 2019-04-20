import { InputType, Field, Int } from 'type-graphql';
import { Min, Max } from 'class-validator';
import { ConfigService } from '@modules/config';

@InputType()
export class CreateCoordCenterInput {
    @Min(0) 
    @Field(_type => Int) 
    id!: number;
    
    @Min(0) 
    @Max(ConfigService.totalSectors) 
    @Field(_type => Int) 
    sector!: number;
}