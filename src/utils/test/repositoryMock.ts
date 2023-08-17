import { Repository } from 'typeorm';
import { MockType } from './mockType';

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
  find: jest.fn(entity => entity)
  // ...
}));
