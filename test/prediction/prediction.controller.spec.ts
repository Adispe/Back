import { JwtModule } from "@nestjs/jwt";
import { Test, TestingModule } from '@nestjs/testing';
import { Readable } from "stream";
import { IaApiModule } from "../../src/ia_api/ia_api.module";
import { ClassAreas, PredictionRequestDTO, PredictionResponseDTO } from "../../src/prediction/dto/interfaces";
import { PredictionController } from '../../src/prediction/prediction.controller';
import { PredictionService } from '../../src/prediction/prediction.service';

describe('PredictionController', () => {
    let predictionController: PredictionController;
    let predictionService: PredictionService;
    let obj: ClassAreas = {
        no_data: 0,
        clouds: 0,
        artificial: 0,
        cultivated: 0,
        broadleaf: 0,
        coniferous: 0,
        herbaceous: 0,
        natural: 0,
        snow: 0,
        water: 0
    }

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
            const mockResponse: PredictionResponseDTO = new PredictionResponseDTO('test', 'test', obj)

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
