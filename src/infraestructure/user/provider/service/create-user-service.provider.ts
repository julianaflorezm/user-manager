import { RoleRepository } from 'src/domain/role/port/repository/role-repository';
import { UserRepository } from 'src/domain/user/port/repository/user-repository';
import { CreateUserService } from 'src/domain/user/service/create-user-service';

export function createUserServiceProvider(
  userRepository: UserRepository,
  roleRepository: RoleRepository,
) {
  return new CreateUserService(userRepository, roleRepository);
}
