import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from "./CreateAppointmentService";
import AppError from '../../../shared/errors/AppError';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
     const fakeAppointmentsRepository = new FakeAppointmentsRepository();
     const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

     const appointmant = await createAppointment.execute({
        date: new Date(),
        provider_id: '123123'
     });

     expect(appointmant).toHaveProperty('id');
     expect(appointmant.provider_id).toBe('123123');
  });


  it('should not be able to create two appointment on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

    const appointmantDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
       date: appointmantDate,
       provider_id: '123123'
    });

    expect(createAppointment.execute({
      date: appointmantDate,
      provider_id: '123123'
   })).rejects.toBeInstanceOf(AppError)
  });
});
