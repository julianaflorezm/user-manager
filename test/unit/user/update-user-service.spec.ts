import { UserRepository } from '../../../src/domain/user/port/repository/user-repository';
import { UpdateUserService } from '../../../src/domain/user/service/update-user-service';
import { CreateUserCommand } from '../../../src/application/user/command/create-user.command';
import { user, userCommand } from '../../___mocks___/user';

describe('UpdateUserService', () => {
  let updateUserService: UpdateUserService;
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
    updateUserService = new UpdateUserService(userRepository);
  });

  it('it should update an user', async () => {
    (userRepository.findUser as jest.Mock).mockResolvedValue(user);
    (userRepository.update as jest.Mock).mockResolvedValue(user);
    const created = await updateUserService.run(user.id, userCommand);
    expect(created).toEqual(user);
    expect(userRepository.update).toHaveBeenCalledWith(user.id, userCommand);
  });
});
