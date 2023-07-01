import { UserRepository } from '../../../src/domain/user/port/repository/user-repository';
import { GetUserListService } from '../../../src/domain/user/service/get-user-list-service';
import { user } from '../../___mocks___/user';

describe('GetUserListService', () => {
  let getUserListService: GetUserListService;
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
    getUserListService = new GetUserListService(userRepository);
  });
  it('it should return a list of all users', async () => {
    (userRepository.findAll as jest.Mock).mockResolvedValue([user]);
    const userList = await getUserListService.run();
    expect(userList).toEqual([user]);
    expect(userRepository.findAll).toHaveBeenCalled();
  });
});
