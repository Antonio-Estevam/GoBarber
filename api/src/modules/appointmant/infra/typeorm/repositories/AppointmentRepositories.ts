import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '../../../../appointmant/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '../../../../appointmant/dtos/ICreateAppointmentDTO';
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

     public async create({ provider_id, date }:ICreateAppointmentDTO):Promise<Appointment>{
       const appointmant = this.ormRepository.create({provider_id, date});
       await this.ormRepository.save(appointmant);

       return appointmant;
     };
}

export default AppointmentsRepository;
