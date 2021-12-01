import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';
import IAppointmentsRepository from '../../../../modules/appointmant/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '../../../../modules/appointmant/dtos/ICreateAppointmentDTO';
import Appointment from '../../infra/typeorm/entities/Appointmant';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
      const findAppointment = this.appointments.find(appointment =>
        isEqual(appointment.date, date),
      );
      return findAppointment;
     }

  public async create({
    provider_id,
    date
  }:ICreateAppointmentDTO):Promise<Appointment>{
    const appointmant = new Appointment();

    Object.assign(appointmant, {id: uuid(), date, provider_id});

    appointmant.provider_id = provider_id;

    this.appointments.push(appointmant);

    return appointmant;
  };
}

export default AppointmentsRepository;
