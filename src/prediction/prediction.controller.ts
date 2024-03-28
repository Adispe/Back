import {Controller, Get, Post, Param, UseGuards, UploadedFile, UseInterceptors, Body} from '@nestjs/common';
import { PredictionService } from './prediction.service';
import Prediction from './prediction.entity';
import {ApiTags, ApiResponse, ApiOperation, ApiConsumes, ApiBody, ApiProperty} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';
import {IaApiService} from "../ia_api/ia_api.service";
import {FileUploadDto, PredictionRequestDTO, PredictionResponseDTO} from "./dto/interfaces";
import {FileInterceptor} from "@nestjs/platform-express/multer";

@Controller('prediction')
@ApiTags('prediction')
export class PredictionController {
  constructor(private readonly predictionService: PredictionService,
              private readonly iaService: IaApiService) {}

  @Get()
  @ApiOperation({ summary: 'Get all predictions' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'List of predictions',
    type: [Prediction],
  })
  async getAllPredictions(): Promise<Prediction[]> {
    return await this.predictionService.getAllPredictions();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get prediction by id' })
  @ApiResponse({
    status: 200,
    description: 'Prediction of the corresponding id',
    type: Prediction,
  })
  async getPredictionById(@Param('id') id: string): Promise<Prediction> {
    return await this.predictionService.getPredictionById(
      Number(id),
    );
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor("file"))
  @ApiBody({
    description: 'Base Image File',
    type: FileUploadDto,
  })
  @ApiOperation({ summary: 'Send new prediction' })
  @ApiResponse({
    status: 200,
    description: 'Created prediction',
    type: Prediction,
  })
  async createPrediction(
      @UploadedFile() file: Express.Multer.File,
      @Body() predReq: PredictionRequestDTO
  ): Promise<PredictionResponseDTO> {
    return await this.predictionService.createPrediction(file, predReq);
  }
}
