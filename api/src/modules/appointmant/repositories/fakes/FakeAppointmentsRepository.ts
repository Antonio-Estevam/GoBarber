import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';
import IAppointmentsRepository from '../../../../modules/appointmant/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '../../../../modules/appointmant/dtos/ICreateAppointmentDTO';
import IFindAllInDayFromProviderDTO from '../../../../modules/appointmant/dtos/IFindAllInDayFromProviderDTO';

import IFindAllInMonthFromProviderDTO from '../../../../modules/appointmant/dtos/IFindAllInMonthFromProviderDTO';
import Appointment from '../../infra/typeorm/entities/Appointmant';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> {
      const findAppointment = this.appointments.find(appointment =>
        isEqual(appointment.date, date) &&
        appointment.provider_id === provider_id,
      );
      return findAppointment;
     }

     public async findAllInMonthFromProvider({provider_id, month, year}:IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
      const appointments = this.appointments.filter(appointment =>{
          return (
            appointment.provider_id === provider_id &&
            getMonth(appointment.date) + 1 === month &&
            getYear(appointment.date) === year
       );
      });
      return appointments;
     }

     public async findAllInDayFromProvider({provider_id, day, month, year}:IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
      const appointments = this.appointments.filter(appointment =>{
          return (
            appointment.provider_id === provider_id &&
            getDate(appointment.date) === day &&
            getMonth(appointment.date) + 1 === month &&
            getYear(appointment.date) === year
       );
      });
      return appointments;
     }

  public async create({
    provider_id,
    user_id,
    date
  }:ICreateAppointmentDTO):Promise<Appointment>{
    const appointmant = new Appointment();

    Object.assign(appointmant, {id: uuid(), date, provider_id, user_id});

    appointmant.provider_id = provider_id;

    this.appointments.push(appointmant);

    return appointmant;
  };
}

export default AppointmentsRepository;
