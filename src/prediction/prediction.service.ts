import { Injectable, NotFoundException } from '@nestjs/common';
import Prediction from './prediction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {PredictionRequestDTO, PredictionResponseDTO} from "./dto/interfaces";
import { IaApiService } from "../ia_api/ia_api.service";
import { log } from 'console';

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

  async createPrediction(file: Express.Multer.File, predReq: PredictionRequestDTO): Promise<any> {
    
    const resp = await this.iaApiService.predicate(file);

    const {image_data, class_colors, class_areas} = resp.data;
    
    const prediction: PredictionResponseDTO = new PredictionResponseDTO(resp.data.image_data, class_colors, class_areas);

    if(predReq.save){
      //TODO SAVE IN THE DB AND MinIO
    }
    return prediction;
  }
}
