import AppError from '../../../shared/errors/AppError';

import FakeUserRepository from '../../users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from "./ListProvidersService";

let fakeUserRepository: FakeUserRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    listProviders = new ListProvidersService(
      fakeUserRepository,
    );
  });

  it('should be able to list the providrs', async () => {

       const user1 = await fakeUserRepository.create({
         name: 'John Doe',
         email: 'johndo@example.com',
         password: '123456',
       });

       const user2 = await fakeUserRepository.create({
         name: 'John Trê',
         email: 'johtre@example.com',
         password: '123456',
       });

       const loggedUser = await fakeUserRepository.create({
         name: 'John Qua',
         email: 'johqua@example.com',
         password: '123456',
       });

      const providers = await listProviders.execute({
        user_id: loggedUser.id,
     });

     expect(providers).toEqual([user1,user2]);
  });
});
