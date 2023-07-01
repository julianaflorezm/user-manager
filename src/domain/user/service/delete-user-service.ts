import { ValueRequiredError } from 'src/domain/errors/value-required-error';
import { UserDto } from 'src/application/user/query/dto/user.dto';
import { UserRepository } from '../port/repository/user-repository';

export class DeleteUserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async run(id: number): Promise<UserDto> {
    if (!id) {
      throw new ValueRequiredError('User id is required');
    }
    const user = await this._userRepository.findUser(id);
    if (!user) {
      throw new ValueRequiredError('User not found');
    }
    if (!(await this._userRepository.deleteUser(id))) {
      throw new ValueRequiredError('User not deleted');
    }
    return user;
  }
}
