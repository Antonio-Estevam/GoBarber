import { inject, injectable } from 'tsyringe';

import Appointmant from '../infra/typeorm/entities/Appointmant';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private AppointmentsRepository: IAppointmentsRepository,
  ){}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }:IRequest): Promise<Appointmant[]>{

    const appointments = await this.AppointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        month,
        year,
    },
    );

    return appointments;
  }
}
export default ListProviderAppointmentsService;
