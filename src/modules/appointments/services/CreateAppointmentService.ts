import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointments';

import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository';

// DRY - Dont Repeat Yourself
// x recebimento das informações
// x trativas de erros e exceções/
// x acesso ao repositorio

interface Request {
    provider_id: string;
    date: Date;
}

// Dependency Inversion Principle (SOLID)
// Single Responsability Principle

class CreateAppointmentService {
    public async execute({ date, provider_id }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;