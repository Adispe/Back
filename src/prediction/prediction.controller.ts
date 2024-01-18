import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PredictionService } from './prediction.service';
import Prediction from './prediction.entity';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('prediction')
@ApiTags('prediction')
export class PredictionController {
  constructor(private readonly predictionService: PredictionService) {}

  @Get()
  @ApiOperation({ summary: 'Get all predictions' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'List of predictions',
    type: [Prediction],
  })
  async getAllPredictions(): Promise<Prediction[]> {
    const predictions = await this.predictionService.getAllPredictions();
    return predictions;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get prediction by id' })
  @ApiResponse({
    status: 200,
    description: 'Prediction of the corresponding id',
    type: Prediction,
  })
  async getPredictionById(@Param('id') id: string): Promise<Prediction> {
    const prediction = await this.predictionService.getPredictionById(
      Number(id),
    );
    return prediction;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Send new prediction' })
  @ApiResponse({
    status: 200,
    description: 'Created prediction',
    type: Prediction,
  })
  async createPrediction(
    @Body('content') content: string,
  ): Promise<Prediction> {
    const newPrediction =
      await this.predictionService.createPrediction(content);
    return newPrediction;
  }
}
