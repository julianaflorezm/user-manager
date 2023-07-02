import { ValueRequiredError } from '../../../domain/errors/value-required-error';
import { UserDto } from '../../../application/user/query/dto/user.dto';
import { UserRepository } from '../port/repository/user-repository';
import { CreateUserCommand } from '../../../application/user/command/create-user.command';
import { HttpStatus } from '@nestjs/common';
import { BussinessError } from '../../../domain/errors/bussiness-error';
import {
  USER_ID_REQUIRED,
  USER_NOT_FOUND,
} from '../../../domain/errors/common-messages';

export class UpdateUserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async run(id: number, user: Partial<CreateUserCommand>): Promise<UserDto> {
    if (!id) {
      throw new BussinessError(USER_ID_REQUIRED, HttpStatus.BAD_REQUEST);
    }
    const usr = await this._userRepository.findUser(id);
    if (!usr) {
      throw new ValueRequiredError(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return await this._userRepository.update(id, user);
  }
}
