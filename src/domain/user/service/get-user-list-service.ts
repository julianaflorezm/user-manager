import { UserDto } from '../../../application/user/query/dto/user.dto';
import { UserRepository } from '../port/repository/user-repository';

export class GetUserListService {
  constructor(private readonly _userRepository: UserRepository) {}

  async run(): Promise<UserDto[]> {
    return await this._userRepository.findAll();
  }
}
