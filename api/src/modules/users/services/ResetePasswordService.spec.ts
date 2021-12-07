import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import ResetPasswordService from "./ResetPasswordService";
import FakeUsersTokenRepository from '../repositories/fakes/FakeUsersTokenRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '../../../shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPasswordServie', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUsersTokenRepository = new FakeUsersTokenRepository();
    fakeHashProvider = new FakeHashProvider();


    resetPassword = new ResetPasswordService(
      fakeUserRepository,
      fakeUsersTokenRepository,
      fakeHashProvider
      );
  });

  it('should be able to reset the password', async () => {
     const user = await fakeUserRepository.create({
       name: 'John Doe',
       email: 'johndo@example.com',
       password: '123456',
     });

      const { token } = await fakeUsersTokenRepository.generate(user.id);

      const generateHash = jest.spyOn(fakeHashProvider,'generateHash');

     await resetPassword.execute({
       password: '123123',
       token,
     });

     const updatedUser = await fakeUserRepository.findById(user.id);

     expect(generateHash).toHaveBeenLastCalledWith('123123');
     expect(updatedUser?.password).toBe('123123');
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existing-token',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const {token} = await fakeUsersTokenRepository.generate('non-existing-user');

    await expect(
      resetPassword.execute({
        token,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to reset password if passed more than 2 hours', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndo@example.com',
      password: '123456',
    });

     const { token } = await fakeUsersTokenRepository.generate(user.id);

     jest.spyOn(Date, 'now').mockImplementationOnce(() => {
       const customDate = new Date();

       return customDate.setHours(customDate.getHours() + 3);
     });

    await expect(resetPassword.execute({
      password: '123123',
      token,
    }),
    ).rejects.toBeInstanceOf(AppError);
 });
});

