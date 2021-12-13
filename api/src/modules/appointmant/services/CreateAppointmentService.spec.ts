import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from "./CreateAppointmentService";
import AppError from '../../../shared/errors/AppError';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

     const appointmant = await createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        user_id:'user-id',
        provider_id: 'provider-id',
     });

     expect(appointmant).toHaveProperty('id');
     expect(appointmant.provider_id).toBe('provider-id');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

    const appointmantDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
       date: appointmantDate,
       user_id:'user-id',
       provider_id: 'provider-id',
    });

    expect(createAppointment.execute({
      date: appointmantDate,
      user_id:'user-id',
      provider_id: 'provider-id',
   })).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to create an appointment on a past date', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      user_id:'user-id',
      provider_id: 'provider-id',
   }),
   ).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      user_id:'user-id',
      provider_id: 'provider-id',
   }),
   ).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
      date: new Date(2020, 4, 11, 7),
      user_id:'user-id',
      provider_id: 'provider-id',
   }),
   ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
      date: new Date(2020, 4, 11, 18),
      user_id:'user-id',
      provider_id: 'provider-id',
   }),
   ).rejects.toBeInstanceOf(AppError);
  });
});
