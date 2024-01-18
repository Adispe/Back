import { Module } from '@nestjs/common';
import {IaApiService} from "./ia_api.service";

@Module({
    providers: [IaApiService],
    exports: [IaApiService]
})
export class IaApiModule {}