import { UserRepository } from '../../../src/domain/user/port/repository/user-repository';
import { DeleteUserService } from '../../../src/domain/user/service/delete-user-service';
import { ValueRequiredError } from '../../../src/domain/errors/value-required-error';
import { user } from '../../___mocks___/user';

describe('DeleteUserService', () => {
  let deleteUserService: DeleteUserService;
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = {
      findAll: jest.fn(),
      findUser: jest.fn(),
      deleteUser: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findByEmail: jest.fn(),
    };
    deleteUserService = new DeleteUserService(userRepository);
  });
  it('it should return info of delete user', async () => {
    (userRepository.findUser as jest.Mock).mockResolvedValue(user);
    (userRepository.deleteUser as jest.Mock).mockResolvedValue(user);
    const found = await deleteUserService.run(user.id);
    expect(found).toEqual(user);
    expect(userRepository.deleteUser).toHaveBeenCalled();
  });

  it('it should throw User not found if user to delete was not found', async () => {
    const id = 1;
    const error = new ValueRequiredError('User not found');
    (userRepository.findUser as jest.Mock).mockRejectedValue(error);
    await expect(deleteUserService.run(id)).rejects.toThrowError(error);
    expect(userRepository.findUser).toHaveBeenCalledWith(id);
  });

  it('it should throw User id is reguired if id of use to delete was not provided', async () => {
    const error = new ValueRequiredError('User id is required');
    (userRepository.findUser as jest.Mock).mockRejectedValue(error);
    await expect(deleteUserService.run(null)).rejects.toThrowError(error);
  });

  it('it should throw User not deleted error', async () => {
    const error = new ValueRequiredError('User not deleted');
    (userRepository.findUser as jest.Mock).mockResolvedValue(user);
    (userRepository.deleteUser as jest.Mock).mockRejectedValue(error);
    await expect(deleteUserService.run(user.id)).rejects.toThrowError(error);
    expect(userRepository.deleteUser).toHaveBeenCalledWith(user.id);
  });
});
