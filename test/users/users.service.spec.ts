import {Test, TestingModule} from '@nestjs/testing';
import {UsersService} from "../../src/users/users.service";
import {User} from "../../src/users/user.entity";
import {Repository} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {Role} from "../../src/users/models/role.model";
import {getRepositoryToken} from "@nestjs/typeorm";

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepository: Partial<Repository<User>>;

  beforeEach(async () => {
    const userRepositoryMock = {
      save: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User))
  });

  describe('create', () => {
    it('should create a new user and return the user object', async () => {
      // Mock bcrypt functions
      jest.spyOn(bcrypt, 'genSalt').mockImplementation(()=> 'mocked-salt');
      jest.spyOn(bcrypt, 'hash').mockImplementation(() => 'mocked-hashed-password');

      const user = new User()
      user.id = 1
      user.username = 'testuser'
      user.role = Role.USER
      user.password = 'mocked-hashed-password'
      user.validatePassword = jest.fn()

      // Mock the save method of the repository
      const saveSpy = jest.spyOn(userRepository, 'save').mockResolvedValue(user);

      // Call the create method
      const result = await usersService.create('testuser', 'testpassword');

      // Assertions
      expect(result).toEqual(user);

      expect(saveSpy).toHaveBeenCalledWith({
        password: "mocked-hashed-password",
        role: Role.USER,
        username: "testuser",
      })
    });
  });

  describe('findOne', () => {
    it('should find a user by id and return the user object', async () => {

      const user = new User()
      user.id = 1
      user.username = 'testuser'
      user.role = Role.USER
      user.password = 'mocked-hashed-password'
      user.validatePassword = jest.fn()

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      // Call the findOne method
      const result = await usersService.findOne(1);

      // Assertions
      expect(result).toEqual(user);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('findByUsername', () => {
    it('should find a user by username and return the user object', async () => {
      const user = new User()
      user.id = 1
      user.username = 'testuser'
      user.role = Role.USER
      user.password = 'mocked-hashed-password'
      user.validatePassword = jest.fn()

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      // Call the findByUsername method
      const result = await usersService.findByUsername('testuser');

      // Assertions
      expect(result).toEqual(user);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { username: 'testuser' } });
    });
  });
});
