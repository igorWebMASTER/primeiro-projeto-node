import AppError from '@shared/errors/AppError';

import FakeEmailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUsersTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailaService';

describe('SendForgotPasswordEmail', () => {
    it('should be able to recover the password using the email', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeEmailProvider = new FakeEmailProvider();

        const sendMail = jest.spyOn(fakeEmailProvider, 'sendMail');

        const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeEmailProvider,
        );

        await fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'jhon@example.com',
            password: '123456',
        });

        await sendForgotPasswordEmail.execute({
            email: 'jhon@example.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('Should not be able to recover a non-existing user password', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeEmailProvider = new FakeEmailProvider();

        const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeEmailProvider,
        );

        await expect(
            sendForgotPasswordEmail.execute({
                email: 'jhon@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a forgot password token', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeEmailProvider = new FakeEmailProvider();
        const fakeUserTokensRepository = new FakeUserTokensRepository();

        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

        const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeEmailProvider,
        );

        const user = await fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'jhon@example.com',
            password: '123456',
        });

        await sendForgotPasswordEmail.execute({
            email: 'jhon@example.com',
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});

// RESETAR SENHA
// Identificar o usuário
