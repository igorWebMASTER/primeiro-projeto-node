// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        listProviders = new ListProvidersService(fakeUsersRepository);
    });

    it('should be able to list the providers', async () => {
        const user1 = await fakeUsersRepository.create({
            name: 'Jhon Doe',
            email: 'jhon@outlook.com',
            password: '123456',
        });

        const user2 = await fakeUsersRepository.create({
            name: 'Jhon Tre',
            email: 'jhontre@outlook.com',
            password: '123456',
        });

        const loggedUser = await fakeUsersRepository.create({
            name: 'Jhon Qua',
            email: 'jhonqua@outlook.com',
            password: '123456',
        });

        const providers = await listProviders.execute({
            user_id: loggedUser.id,
        });

        expect(providers).toEqual([user1, user2]);
    });
});
