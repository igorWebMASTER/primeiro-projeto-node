import Appointment from '../infra/typeorm/entities/Appointments';
import ICreateAppointmentDto from '../dtos/ICreateAppointmentsDTO';
import IFinAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';
import IFinAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO';

export default interface IAppointmentsRepository {
    create({ date }: ICreateAppointmentDto): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>;
    findAllInMonthFromProvider(
        data: IFinAllInMonthFromProviderDTO,
    ): Promise<Appointment[]>;
    findAllInDayFromProvider(
        data: IFinAllInDayFromProviderDTO,
    ): Promise<Appointment[]>;
}
