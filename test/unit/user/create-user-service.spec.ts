import { UserRepository } from '../../../src/domain/user/port/repository/user-repository';
import { CreateUserService } from '../../../src/domain/user/service/create-user-service';
import { User } from '../../../src/domain/user/model/user';
import { RoleRepository } from '../../../src/domain/role/port/repository/role-repository';
import { Role } from '../../../src/domain/role/model/role';
import { user } from '../../___mocks___/user';

describe('GetUserService', () => {
  let createUserService: CreateUserService;
  let userRepository: UserRepository;
  let roleRepository: RoleRepository;

  beforeEach(() => {
    userRepository = {
      findAll: jest.fn(),
      findUser: jest.fn(),
      deleteUser: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findByEmail: jest.fn(),
    };
    roleRepository = {
      findRole: jest.fn(),
    };
    createUserService = new CreateUserService(userRepository, roleRepository);
  });

  it('it should create an user', async () => {
    const role = new Role(
      user.role.id,
      user.role.name,
      user.role.created,
      user.role.updated,
    );
    user.role = role;
    (roleRepository.findRole as jest.Mock).mockResolvedValue(user.role);
    (userRepository.create as jest.Mock).mockResolvedValue(user);
    const created = await createUserService.run(
      await User.create(user.name, '122', user.email, user.phone, null),
      user.role.id,
    );
    expect(created).toEqual(user);
    expect(userRepository.create).toHaveBeenCalled();
  });
});
