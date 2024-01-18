import { Injectable, NotFoundException } from '@nestjs/common';
import Prediction from './prediction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PredictionService {
  constructor(
    @InjectRepository(Prediction)
    private predictionRepository: Repository<Prediction>,
  ) {}

  async getAllPredictions() {
    const predictions = await this.predictionRepository.find();
    return predictions;
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

  async createPrediction(body: any) {
    const newPrediction: Prediction = await this.predictionRepository.create();
    await this.predictionRepository.save(newPrediction);
    return newPrediction;
  }
}
