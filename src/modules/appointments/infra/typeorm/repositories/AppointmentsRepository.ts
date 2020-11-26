import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../entities/Appointments';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
    public async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointment = await this.findOne({
            where: { date },
        });

        return findAppointment || null;
    }
}

// const response = findByDate(date). then(response => )

export default AppointmentsRepository;