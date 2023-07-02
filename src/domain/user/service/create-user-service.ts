import { RoleRepository } from '../../../domain/role/port/repository/role-repository';
import { User } from '../model/user';
import { UserDto } from '../../../application/user/query/dto/user.dto';
import { UserRepository } from '../port/repository/user-repository';
import { Role } from '../../../domain/role/model/role';
import { HttpStatus } from '@nestjs/common';
import { BussinessError } from '../../../domain/errors/bussiness-error';
import { EMAIL_ALREADY_EXISTS } from '../../../domain/errors/common-messages';

export class CreateUserService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _roleRepository: RoleRepository,
  ) {}

  async run(user: User, roleId: number): Promise<UserDto> {
    const usr = await this._userRepository.findByEmail(user.email);
    if (usr) {
      throw new BussinessError(EMAIL_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
    }
    const { id, name, created, updated } = await this._roleRepository.findRole(
      roleId,
    );
    const role = new Role(id, name, created, updated);
    user.role = role;
    return await this._userRepository.create(user);
  }
}
