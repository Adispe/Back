import { Test, TestingModule } from '@nestjs/testing';
import { Readable } from "stream";
import { Repository } from 'typeorm';
import { ClassAreas, PredictionRequestDTO, PredictionResponseDTO } from "../../src/prediction/dto/interfaces";
import Prediction from "../../src/prediction/prediction.entity";
import { PredictionService } from "../../src/prediction/prediction.service";

describe('PredictionService', () => {
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

    let predictionService: PredictionService;
    let predictionRepository: Partial<Repository<Prediction>>;

    beforeEach(async () => {
        const predictionServiceMock = {
            createPrediction: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: PredictionService,
                    useValue: predictionServiceMock,
                },
            ],
        }).compile();

        predictionService = module.get<PredictionService>(PredictionService);
    });

    describe('prediction', () => {
        it('should return and do a prediction ', async () => {
            const mockResponse: PredictionResponseDTO = new PredictionResponseDTO('test', 'test', obj)

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

            // Mock the save method of the repository
            jest.spyOn(predictionService, 'createPrediction').mockResolvedValue(mockResponse);

            // Call the create method
            const result = await predictionService.createPrediction(file, predReq);

            // Assertions
            expect(result).toEqual(mockResponse);

            expect(predictionService.createPrediction).toHaveBeenCalledWith(file, {userId: 1, save: false})
        });
    });
});
