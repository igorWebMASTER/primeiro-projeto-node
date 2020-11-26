import Appointment from '../infra/typeorm/entities/Appointments';

interface IAppointmentsRepository {
    findByDate(date: Date): Promise<Appointment | null>;
}
