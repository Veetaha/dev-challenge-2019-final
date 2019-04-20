import * as Fs from 'fs';
import * as Util from 'util';
import * as Joi from 'typesafe-joi';
import { Injectable, OnModuleInit } from '@nestjs/common';

import { ConfigService } from '@modules/config';
import { AlgorithmsService } from '@modules/utils';
import { SpaceRouteView } from './space-route-view.inteface';
import { SpaceRoute } from './space-route.gql-obj';




const readFile = Util.promisify(Fs.readFile);

@Injectable()
export class SpaceRouteService implements OnModuleInit {
    private gates!: number[][];

    constructor(
        private readonly config: ConfigService,
        private readonly algo:   AlgorithmsService
    ) {}

    async onModuleInit() {
        await this.loadGatesFromFileOrFail(this.config.gatesFilePath);
    }

    /**
     * Reads and deserializes gates matrix from the given file at `filePath`.
     * 
     * @param filePath Path to the target file to deserialize.
     * 
     * @throws Error if file read error occured or detected invalid gate.
     */
    async loadGatesFromFileOrFail(filePath: string) {
        const serializedGates = await readFile(filePath, 'utf8');

        this.gates = serializedGates
            .split('\n')
            .map(level => level
                .split(' ')
                .map(gate => Joi.attempt(gate, Joi.number().integer().positive().required()))     
            );
    }


    /**
     * Returns `SpaceRoute[]` for the given `sector`. It calculates results
     * on the fly according to the previously loaded file by `loadGatesFromFileOrFail()`.
     * 
     * @param sector Sector to calculate routes for.
     */
    computeViewsFromFile(sector: number) {
        return this.gates.reduce((result, row, i) => {
            const rowRoute = this.algo.getFirstSubArrFromSortedWithSum(row, sector);
            if (rowRoute != null) {
                result.push({ 
                    beginIndex: rowRoute.begin,
                    endIndex:   rowRoute.end, 
                    sector, 
                    securityLevel: i + 1 
                });
            }
            return result;
        }, new Array<SpaceRouteView>());
    }

    getRoutesFromView({ securityLevel, beginIndex, endIndex }: SpaceRouteView) {
        return new SpaceRoute({
            securityLevel,
            gates: this.gates[securityLevel - 1].slice(beginIndex, endIndex + 1)
        });
    }

    getRoutes(sector: number) {
        return this
            .computeViewsFromFile(sector)
            .map(view => this.getRoutesFromView(view));
    }
}
