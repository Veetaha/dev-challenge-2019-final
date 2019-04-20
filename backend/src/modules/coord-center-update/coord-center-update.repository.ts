import { EntityRepository, Repository } from 'typeorm';
import { CoordCenterUpdate } from './coord-center-update.entity';

@EntityRepository(CoordCenterUpdate)
export class CoordCenterUpdateRepo extends Repository<CoordCenterUpdate> {

}