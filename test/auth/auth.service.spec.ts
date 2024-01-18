import {Test, TestingModule} from '@nestjs/testing';
import {AuthService} from '../../src/auth/auth.service';
import {UsersService} from '../../src/users/users.service';
import {JwtService} from '@nestjs/jwt';
import {UnauthorizedException} from '@nestjs/common';
import {User} from "../../src/users/user.entity";
import {Role} from "../../src/users/models/role.model";

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const usersServiceMock = {
      findByUsername: jest.fn(),
      create: jest.fn(),
    };

    const jwtServiceMock: Partial<JwtService> = {
      signAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService)
    jwtService = module.get<JwtService>(JwtService)
  });

  describe('signIn', () => {
    it('should sign in the user and return an access token', async () => {
      const mockUser: User = {
        id: 1,
        username: 'testuser',
        validatePassword: jest.fn(),
        role: Role.USER,
        password: 'testPassword',
        predictions: []
      };

      jest.spyOn(usersService, 'findByUsername').mockResolvedValue(mockUser);

      jest.spyOn(mockUser, 'validatePassword').mockResolvedValue(true)

      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('mocked-access-token');

      const result = await authService.signIn('testuser', 'password123');

      // Assertions
      expect(result).toEqual({ access_token: 'mocked-access-token' });
      expect(usersService.findByUsername).toHaveBeenCalledWith('testuser');
      expect(mockUser.validatePassword).toHaveBeenCalledWith('password123');
      expect(jwtService.signAsync).toHaveBeenCalledWith(
          { username: 'testuser', sub: 1 },
          { secret: process.env.JWT_SECRET },
      );
    });

    it('should throw UnauthorizedException for invalid password', async () => {
      const mockUser: User = {
        id: 1,
        username: 'testuser',
        validatePassword: jest.fn(),
        role: Role.USER,
        password: 'testPassword',
        predictions: []
      };

      jest.spyOn(usersService, 'findByUsername').mockResolvedValue(mockUser);

      jest.spyOn(mockUser,'validatePassword').mockResolvedValue(false);

      await expect(authService.signIn('testuser', 'invalidpassword')).rejects.toThrow(UnauthorizedException);

      expect(usersService.findByUsername).toHaveBeenCalledWith('testuser');
      expect(mockUser.validatePassword).toHaveBeenCalledWith('invalidpassword');
      expect(jwtService.signAsync).not.toHaveBeenCalled();
    });
  });

  describe('register', () => {
    it('should register a new user and return user details', async () => {
      // Mock the user creation in UsersService
      const mockUser: User = {
        id: 1,
        username: 'testuser',
        validatePassword: jest.fn(),
        role: Role.USER,
        password: 'testPassword',
        predictions: []
      };

      jest.spyOn(usersService, 'create').mockResolvedValue(mockUser);

      const result = await authService.register('testuser', 'testPassword');

      expect(result).toEqual({ id: 1, username: 'testuser', role: Role.USER });
      expect(usersService.create).toHaveBeenCalledWith('testuser', 'testPassword');
    });

    it('should throw an error for failed user registration', async () => {
      // Mock the user creation in UsersService to return null (failed)
      jest.spyOn(usersService, 'create').mockRejectedValue(new Error("An error occured during user registration."));

      // Call the register method
      await expect(authService.register('testuser', 'password123')).rejects.toThrowError('An error occured during user registration.');

      // Assertions
      expect(usersService.create).toHaveBeenCalledWith('testuser', 'password123');
    });
  });
});
