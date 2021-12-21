import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailityService from '../../../services/ListProviderDayAvailityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response>{
    const { provider_id } = request.params;

    const { day, month, year } = request.query;

   const listProviderDayAvaility = container.resolve(ListProviderDayAvailityService);

    const availability =  await listProviderDayAvaility.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(availability);

  }
}
