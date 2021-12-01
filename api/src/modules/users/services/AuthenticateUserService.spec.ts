import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserSevice from "./CreateUserService";

describe('AuthenticateUserService', () => {
  it('should be able to autenticate', async () => {
     const fakeUserRepository = new FakeUserRepository();

     const createUser = new CreateUserSevice(fakeUserRepository);
     const authenticateUser = new AuthenticateUserService(fakeUserRepository);

     await createUser.execute({
      name: 'John Doe',
      email: 'johndo@example.com',
      password:'123456'
     });

     const response = await authenticateUser.execute({
       email: 'johndo@example.com',
       password:'123456'
     });

     expect(response).toHaveProperty('token');
  });
});
