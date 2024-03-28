import {Test, TestingModule} from '@nestjs/testing';
import {UsersService} from "../../src/users/users.service";
import {User} from "../../src/users/user.entity";
import {Repository} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {Role} from "../../src/users/models/role.model";
import {getRepositoryToken} from "@nestjs/typeorm";
import {PredictionService} from "../../src/prediction/prediction.service";
import Prediction from "../../src/prediction/prediction.entity";
import {Readable} from "stream";
import {PredictionRequestDTO, PredictionResponseDTO} from "../../src/prediction/dto/interfaces";

describe('PredictionService', () => {
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
            const mockResponse: PredictionResponseDTO = new PredictionResponseDTO(Buffer.alloc(0))

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
