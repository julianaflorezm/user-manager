import { UserRepository } from '../../../src/domain/user/port/repository/user-repository';
import { GetUserService } from '../../../src/domain/user/service/get-user-service';
import { ValueRequiredError } from '../../../src/domain/errors/value-required-error';
import { user } from '../../___mocks___/user';

describe('GetUserService', () => {
  let getUserService: GetUserService;
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
    getUserService = new GetUserService(userRepository);
  });
  it('it should return info by an user', async () => {
    (userRepository.findUser as jest.Mock).mockResolvedValue(user);
    const found = await getUserService.run(user.id);
    expect(found).toEqual(user);
    expect(userRepository.findUser).toHaveBeenCalled();
  });

  it('it should throw User not found if user was not found', async () => {
    const id = 1;
    const error = new ValueRequiredError('User not found');
    (userRepository.findUser as jest.Mock).mockRejectedValue(error);
    //const found = await getUserService.run(id);
    await expect(getUserService.run(id)).rejects.toThrowError(error);
    expect(userRepository.findUser).toHaveBeenCalledWith(id);
  });

  it('it should throw User id is reguired if user id was not provided', async () => {
    const error = new ValueRequiredError('User id is required');
    (userRepository.findUser as jest.Mock).mockRejectedValue(error);
    await expect(getUserService.run(null)).rejects.toThrowError(error);
  });
});
