import { ValueRequiredError } from 'src/domain/errors/value-required-error';
import { UserDto } from 'src/application/user/query/dto/user.dto';
import { UserRepository } from '../port/repository/user-repository';
import { CreateUserCommand } from 'src/application/user/command/create-user.command';

export class UpdateUserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async run(id: number, user: Partial<CreateUserCommand>): Promise<UserDto> {
    if (!id) {
      throw new ValueRequiredError('User id is required');
    }
    const usr = await this._userRepository.findUser(id);
    if (!usr) {
      throw new ValueRequiredError('User not found');
    }
    return await this._userRepository.update(id, user);
  }
}
