import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailaService';

describe('SendForgotPasswordEmail', () => {
    it('should be able to recover the password using the email', async () => {
        const fakeUsersRepository = new FakeUsersRepository();

        const createUser = new SendForgotPasswordEmailService(
            fakeUsersRepository,
        );

        const user = await createUser.execute({
            name: 'Jhon Doe',
            email: 'jhon@example.com',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });
});
