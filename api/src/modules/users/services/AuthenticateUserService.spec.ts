import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserSevice from "./CreateUserService";
import User from '../infra/typeorm/entities/User';

describe('AuthenticateUserService', () => {
  it('should be able to autenticate', async () => {
     const fakeUserRepository = new FakeUserRepository();
     const fakeHashProvider = new FakeHashProvider();

     const createUser = new CreateUserSevice(
       fakeUserRepository,
       fakeHashProvider,
       );

     const authenticateUser = new AuthenticateUserService(
       fakeUserRepository,
       fakeHashProvider
       );

     const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndo@example.com',
      password:'123456'
     });

     const response = await authenticateUser.execute({
       email: 'johndo@example.com',
       password:'123456'
     });

     expect(response.user).toEqual(user);
  });


  it('should not be able to autenticate with non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserSevice(
      fakeUserRepository,
      fakeHashProvider,
      );

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
      );

    const user = await createUser.execute({
     name: 'John Doe',
     email: 'johndo@example.com',
     password:'123456'
    });

    const response = await authenticateUser.execute({
      email: 'johndo@example.com',
      password:'123456'
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
 });
});



//ver video 07 refatoração de testes
