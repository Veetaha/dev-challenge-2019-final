import _ from 'lodash';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { PaginationParamsInput } from '@modules/common';
import { CoordCenter           } from './coord-center.entity';


@EntityRepository(CoordCenter)
export class CoordCenterRepo extends Repository<CoordCenter> {

    async getCoordCenters({limit, offset}:PaginationParamsInput) {
        return this.findAndCount({
            skip: offset,
            take: limit
        });
    }

    async getAdjacentOrFail(id: number) {
        const target   = await this.findOneOrFail(id);
        const adjacent = await this
            .createQueryBuilder('coordCenter')
            .where(
                'coordCenter.endSector = :prevEnd OR coordCenter.beginSector = :nextBegin', 
                { prevEnd: target.beginSector, nextBegin: target.endSector }
            ).getMany();
        const sortedAdjacent = _.sortBy(adjacent, 'beginSector');

        return {
            target,
            prev: _.head(sortedAdjacent),
            next: _.nth(sortedAdjacent, 1)
        };
    }

    async ensureNoIdOrBeginSectorExistsOrFail(id: number, beginSector: number) {
        if ((await this.count({ where: [{ id }, { beginSector }] })) !== 0) {
            throw new BadRequestException(
                `coordination center with id '${id}' or beginSector '${beginSector}' already exists`
            );
        }
    }

    async getBySector(sector: number) {
        return this
            .createQueryBuilder('coordCenter')
            .where(
                ':sector > coordCenter.beginSector AND :sector <= coordCenter.endSector', 
                { sector }
            ).getOne();
    }

    async getIdBySectorOrFail(sector: number) {
        const coordCenter = await this.getBySector(sector);
        if (coordCenter == null) {
            throw new NotFoundException(`nothing was found for sector '${sector}'`);
        }
        return coordCenter.id;
    }

}