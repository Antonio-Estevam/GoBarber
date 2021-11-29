import Appointment from '../infra/typeorm/entities/Appointmant'

export default interface IAppointmentsRepository {
 findByDate(date: Date): Promise<Appointment | undefined>;
}