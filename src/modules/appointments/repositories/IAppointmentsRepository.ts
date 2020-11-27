import Appointment from '../infra/typeorm/entities/Appointments';

export interface IAppointmentsRepository {
    findByDate(date: Date): Promise<Appointment | undefined>;
}
