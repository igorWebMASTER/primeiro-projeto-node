import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUsersTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();

        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokensRepository,
        );
    });

    it('should be able to recover the password using the email', async () => {
        const sendMail = jest.spyOn(fakeEmailProvider, 'sendMail');
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
