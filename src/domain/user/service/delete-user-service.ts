import { ValueRequiredError } from '../../../domain/errors/value-required-error';
import { UserDto } from '../../../application/user/query/dto/user.dto';
import { UserRepository } from '../port/repository/user-repository';
import { HttpStatus } from '@nestjs/common';
import { BussinessError } from '../../../domain/errors/bussiness-error';
import {
  USER_ID_REQUIRED,
  USER_NOT_FOUND,
  USER_NOT_REMOVED,
} from '../../../domain/errors/common-messages';

export class DeleteUserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async run(id: number): Promise<UserDto> {
    if (!id) {
      throw new BussinessError(USER_ID_REQUIRED, HttpStatus.BAD_REQUEST);
    }
    const user = await this._userRepository.findUser(id);
    if (!user) {
      throw new ValueRequiredError(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    if (!(await this._userRepository.deleteUser(id))) {
      throw new BussinessError(USER_NOT_REMOVED, HttpStatus.NOT_MODIFIED);
    }
    return user;
  }
}
