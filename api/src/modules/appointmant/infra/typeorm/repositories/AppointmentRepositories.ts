import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentsRepository from '../../../../appointmant/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '../../../../appointmant/dtos/ICreateAppointmentDTO';
import IFindAllInDayFromProviderDTO from '../../../../appointmant/dtos/IFindAllInDayFromProviderDTO';

import IFindAllInMonthFromProviderDTO from '../../../../appointmant/dtos/IFindAllInMonthFromProviderDTO';
import Appointment from '../entities/Appointmant';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor(){
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });
      return findAppointment;
     }

  public async findAllInMonthFromProvider({provider_id, month, year}:IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2,'0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName =>
          `to_char(${dateFieldName}, 'MM-YYYY') = ${parsedMonth}-${year}`,
          ),
      } //verificar query para mysql
    });
   return appointments;
  }

  public async findAllInDayFromProvider({provider_id, day, month, year}:IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2,'0');
    const parsedMonth = String(month).padStart(2,'0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName =>
          `to_char(${dateFieldName}, 'DD-MM-YYYY') = ${parsedDay}-${parsedMonth}-${year}`,
          ),
      } //verificar query para mysql
    });
   return appointments;
  }


  public async create({ provider_id, user_id, date }:ICreateAppointmentDTO):Promise<Appointment>{
    const appointmant = this.ormRepository.create({provider_id, user_id, date});
    await this.ormRepository.save(appointmant);

    return appointmant;
  };
}

export default AppointmentsRepository;
