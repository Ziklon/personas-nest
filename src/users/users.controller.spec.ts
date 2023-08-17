import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { MockType } from '../utils/test/mockType';
import { repositoryMockFactory } from '../utils/test/repositoryMock';


describe('UsersController', () => {

  let usersController: UsersController;
  let repositoryMock: MockType<Repository<User>>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [UsersController],
        providers: [UsersService, 
          {
            provide: getRepositoryToken(User),
            useFactory: repositoryMockFactory
          }
        ],
      }).compile();
    usersController = moduleRef.get<UsersController>(UsersController);
    repositoryMock = moduleRef.get(getRepositoryToken(User));
  });
  
  describe('testing findAll', () => {
    it('should return an empty array', async () => {
      const result = [];
      repositoryMock.find.mockReturnValue(result);
      expect(await usersController.getAll()).toBe(result);
    });

    it('should return one persona', async () => {
      const result = [{nombre: 'Wilber', apellido: 'Tor', edad : 30}];
      repositoryMock.find.mockReturnValue(result);
      expect(await usersController.getAll()).toBe(result);
    });
  });

});
