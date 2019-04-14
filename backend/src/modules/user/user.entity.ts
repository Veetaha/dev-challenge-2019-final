import * as Gql from 'type-graphql';
import * as Orm from 'typeorm';


import * as I from '@app/interfaces';
import { UserRole } from './user-role.enum';
import { IntegerRange } from '@modules/utils/math/integer-range.class';

@Gql.ObjectType()
@Orm.Entity()
export class User {

    static readonly limits = {
        name:      new IntegerRange(3, 256),
        password:  new IntegerRange(5, 37),
        login:     new IntegerRange(2, 37),
        avatarUrl: new IntegerRange(0, 256)
    };

    @Gql.Field()
    @Orm.CreateDateColumn({}) 
    creationDate!: Date;

    @Gql.Field()
    @Orm.UpdateDateColumn() 
    lastUpdateDate!: Date;


    @Gql.Field(_type => UserRole)
    @Orm.Column({
        type:    'enum',
        enum:    UserRole,
        default: UserRole.Regular
    })
    role = UserRole.Regular;

    @Gql.Field()
    @Orm.Column({
        length: User.limits.name.max
    })        
    name!: string;

    @Gql.Field()
    @Orm.PrimaryColumn({ 
        length:   User.limits.login.max
    }) 
    login!: string;
    
    @Orm.Column({ select: false })        
    passwordHash?: string;

    @Gql.Field(_type => String, { nullable: false }) // has default in resolver
    @Orm.Column({ 
        type:    'varchar',
        length:   User.limits.avatarUrl.max, 
        nullable: true 
    })
    avatarUrl?: I.Nullable<string>;
}