import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { AuthController } from '../../src/auth/auth.controller';
import {Role} from "../../src/users/models/role.model";
import {UsersService} from "../../src/users/users.service";
import {JwtModule} from "@nestjs/jwt";
import {UsersModule} from "../../src/users/users.module";

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const authServiceMock =  {
      register: jest.fn()
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{
        provide: AuthService,
        useValue: authServiceMock
      }],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('should return a successful response', async () => {
      const mockResponse = {
        id: 243454825367,
        username: "testUser",
        role: Role.USER
      }

      jest.spyOn(authService, 'register').mockImplementation(() => Promise.resolve(mockResponse));

      const registerDto = { username: 'testuser', password: 'testpassword' };

      const response = await authController.register(registerDto);

      expect(response).toEqual(mockResponse);
      expect(authService.register).toHaveBeenCalledWith('testuser', 'testpassword');
    });
  });
});
