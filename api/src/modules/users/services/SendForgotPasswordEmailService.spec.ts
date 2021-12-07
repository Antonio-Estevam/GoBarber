import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '../../../shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from "./SendForgotPasswordEmailService";
import FakeUsersTokenRepository from '../repositories/fakes/FakeUsersTokenRepository';
import AppError from '../../../shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUsersTokenRepository = new FakeUsersTokenRepository();


    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUsersTokenRepository
      );
  });

  it('should be able to recover the password using the email', async () => {

     const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
     await fakeUserRepository.create({
       name: 'John Doe',
       email: 'johndo@example.com',
       password: '123456',
     });

     await sendForgotPasswordEmail.execute({
       email: 'johndo@example.com',
     });

     expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
     await expect(
      sendForgotPasswordEmail.execute({
       email: 'johndo@example.com',
     }),
     ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUsersTokenRepository, 'generate');
     const user = await fakeUserRepository.create({
       name: 'John Doe',
       email: 'johndo@example.com',
       password: '123456',
     });

     await sendForgotPasswordEmail.execute({
       email: 'johndo@example.com',
     });

     expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});

