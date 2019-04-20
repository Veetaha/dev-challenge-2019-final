import * as Orm from 'typeorm';
import * as Gql from 'type-graphql';
import { Int } from 'type-graphql';

@Gql.ObjectType()
@Orm.Entity() 
export class CoordCenter {
    /**
     * Sector unique identifier (number)
     */
    @Gql.Field(_type => Int)
    @Orm.PrimaryColumn()
    id!: number;

    /**
     * Exclusive begin sector number
     */
    @Gql.Field(_type => Int) 
    @Orm.Column('int') 
    beginSector!: number; 

    /**
     * Inclusive end sector number
     */
    @Gql.Field(_type => Int) 
    @Orm.Column('int') 
    endSector!: number;
}