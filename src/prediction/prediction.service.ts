import { Injectable, NotFoundException } from '@nestjs/common';
import Prediction from './prediction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {PredictionRequestDTO, PredictionResponseDTO} from "./dto/interfaces";
import { IaApiService } from "../ia_api/ia_api.service";

@Injectable()
export class PredictionService {
  constructor(
    @InjectRepository(Prediction)
    private predictionRepository: Repository<Prediction>,
    private iaApiService: IaApiService
  ) {}

  async getAllPredictions() {
    return await this.predictionRepository.find();
  }

  async getPredictionById(id: number) {
    const prediction = await this.predictionRepository.findOne({
      where: { id: id },
    });
    if (prediction) {
      return prediction;
    }
    throw new NotFoundException('Could not find the prediction');
  }

  async createPrediction(file: Express.Multer.File, predReq: PredictionRequestDTO): Promise<PredictionResponseDTO> {

    const predication = await this.iaApiService.predicate(file);
    const resp: PredictionResponseDTO = new PredictionResponseDTO(predication.data);

    if(predReq.save){
      //TODO SAVE IN THE DB AND MinIO
    }

    return resp;
  }
}
