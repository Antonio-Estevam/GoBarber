import AppError from '../../../shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from "./ShowProfileService";

let fakeUserRepository: FakeUserRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    showProfile = new ShowProfileService(
      fakeUserRepository,
    );
  });

  it('should be able show the profile', async () => {

       const user = await fakeUserRepository.create({
         name: 'John Doe',
         email: 'johndo@example.com',
         password: '123456',
       });

      const profile = await showProfile.execute({
        user_id: user.id,
     });

     expect(profile.name).toBe('John Doe');
     expect(profile.email).toBe('johndo@example.com');
  });

  it('should not be able show the profile from non-existing user', async () => {

    expect(
      showProfile.execute({
        user_id: 'non-existing-user-id',
     }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
