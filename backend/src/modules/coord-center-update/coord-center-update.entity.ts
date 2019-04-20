import * as Orm from 'typeorm';
import { UpdateType } from './update-type.enum';

@Orm.Entity()
export class CoordCenterUpdate {
    @Orm.PrimaryGeneratedColumn()
    id!: number;

    @Orm.Column({ type: 'enum', enum: UpdateType })
    updateType!: UpdateType;

    @Orm.Column() centerId!:    number;
    @Orm.Column() beginSector!: number;
    @Orm.Column() endSector!:   number;
}