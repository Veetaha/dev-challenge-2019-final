import { Page } from '@modules/utils';
import { CoordCenter } from './coord-center.entity';
import { ObjectType } from 'type-graphql';

@ObjectType()
export class GetCoordCentersResponse extends Page(CoordCenter) {}