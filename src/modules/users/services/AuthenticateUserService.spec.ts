import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
    it('should be able to authenticate', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
        );

        await createUser.execute({
            name: 'Jhon Doe',
            email: 'jhon@example.com',
            password: '123456',
        });

        const response = await authenticateUser.execute({
            email: 'jhon@example.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
    });
});