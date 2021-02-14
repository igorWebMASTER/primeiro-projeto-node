import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfile = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should be able to update the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Jhon Doe',
            email: 'jhon@oulook.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'Jhon Tre',
            email: 'jhontre@outlook.com',
        });

        expect(updatedUser.name).toBe('Jhon Tre');
        expect(updatedUser.email).toBe('jhontre@outlook.com');
    });

    it('should not be able to change to another user email', async () => {
        await fakeUsersRepository.create({
            name: 'Jhon Doe',
            email: 'jhon@oulook.com',
            password: '123456',
        });

        const user = await fakeUsersRepository.create({
            name: 'Test',
            email: 'test@outlook.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'Jhon Tre',
                email: 'jhon@outlook.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Jhon Doe',
            email: 'jhon@oulook.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'Jhon Tre',
            email: 'jhontre@outlook.com',
            old_password: '123123',
            password: '123123',
        });

        expect(updatedUser.password).toBe('123123');
    });
});
