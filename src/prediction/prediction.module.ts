import { Module } from '@nestjs/common';
import { PredictionService } from './prediction.service';
import { PredictionController } from './prediction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Prediction from "./prediction.entity";
import {IaApiModule} from "../ia_api/ia_api.module";

@Module({
  imports: [IaApiModule, TypeOrmModule.forFeature([Prediction])],
  providers: [PredictionService],
  controllers: [PredictionController],
})
export class PredictionModule {}
