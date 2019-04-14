import { Module } from '@nestjs/common';

import { UtilsModule } from '@modules/utils';

import { ConfigService } from './config.service';
export { ConfigService } from './config.service';

const services = [
    ConfigService
];

@Module({
    imports:   [UtilsModule],
    providers: services,
    exports:   services
})
export class ConfigModule {
    static asyncOptsProvider = { 
        imports:     [ConfigModule], 
        useExisting: ConfigService, 
    };
}
