import Appointment from '../infra/typeorm/entities/Appointments';
import ICreateAppointmentDto from '../dtos/ICreateAppointmentsDTO';

export interface IAppointmentsRepository {
    create({ date }: ICreateAppointmentDto): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>;
}
