import { Module } from '@nestjs/common';
import {MinIOService} from "./minIO.service";

@Module({
    providers: [MinIOService]
})
export class MinIOModule {}
