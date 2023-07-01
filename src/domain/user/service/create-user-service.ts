import { RoleRepository } from 'src/domain/role/port/repository/role-repository';
import { UserDto } from 'src/application/user/query/dto/user.dto';
import { User } from '../model/user';
import { UserRepository } from '../port/repository/user-repository';
import { Role } from 'src/domain/role/model/role';

export class CreateUserService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _roleRepository: RoleRepository,
  ) {}

  async run(user: User, roleId: number): Promise<UserDto> {
    const { id, name, created, updated } = await this._roleRepository.findRole(
      roleId,
    );
    const role = new Role(id, name, created, updated);
    user.role = role;
    return await this._userRepository.create(user);
  }
}
