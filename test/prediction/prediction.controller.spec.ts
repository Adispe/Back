import { Test, TestingModule } from '@nestjs/testing';
import { PredictionService } from '../../src/prediction/prediction.service';
import { PredictionController } from '../../src/prediction/prediction.controller';
import {PredictionRequestDTO, PredictionResponseDTO} from "../../src/prediction/dto/interfaces";
import {Readable} from "stream";
import {JwtModule} from "@nestjs/jwt";
import {IaApiModule} from "../../src/ia_api/ia_api.module";

describe('PredictionController', () => {
    let predictionController: PredictionController;
    let predictionService: PredictionService;

    beforeEach(async () => {
        const PredictionServiceMock =  {
            createPrediction: jest.fn()
        }

        const module: TestingModule = await Test.createTestingModule({
            imports: [JwtModule, IaApiModule],
            controllers: [PredictionController],
            providers: [{
                provide: PredictionService,
                useValue: PredictionServiceMock
            }],
        }).compile();

        predictionController = module.get<PredictionController>(PredictionController);
        predictionService = module.get<PredictionService>(PredictionService);
    });

    describe('predict', () => {
        it('should return a successful response', async () => {
            const mockResponse: PredictionResponseDTO = new PredictionResponseDTO('test')

            jest.spyOn(predictionService, 'createPrediction').mockImplementation(() => Promise.resolve(mockResponse));

            const file: Express.Multer.File = {
                fieldname: "test",
                originalname: "test",
                encoding: "test",
                mimetype: "test",
                size: 0,
                stream: new Readable(),
                destination: "test",
                filename: "test",
                path: "test",
                buffer: Buffer.alloc(0),
            };

            const predReq: PredictionRequestDTO = {userId: 1, save: false}

            const response = await predictionController.createPrediction(file, predReq);

            expect(response).toEqual(mockResponse);
            expect(predictionService.createPrediction).toHaveBeenCalledWith(file, predReq);
        });
    });
});
