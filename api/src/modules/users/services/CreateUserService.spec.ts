import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from "./CreateUserService";
import AppError from '../../../shared/errors/AppError';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
     const fakeUserRepository = new FakeUserRepository();
     const createUser = new CreateUserService(fakeUserRepository);

     const user = await createUser.execute({
       name: 'john Doe',
       email: 'johndo@example.com',
       password:'123456'
     });

     expect(user).toHaveProperty('id');
  });


  it('should be able to create a new user with same email from another', async () => {
     const fakeUserRepository = new FakeUserRepository();
     const createUser = new CreateUserService(fakeUserRepository);

     const user = await createUser.execute({
       name: 'john Doe',
       email: 'johndo@example.com',
       password:'123456'
     });

     expect(createUser.execute({
      name: 'john Doe',
      email: 'johndo@example.com',
      password:'123456'
    }),
    ).rejects.toBeInstanceOf(AppError)
  });
});
