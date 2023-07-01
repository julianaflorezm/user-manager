import { ValueRequiredError } from 'src/domain/errors/value-required-error';
import { UserDto } from 'src/application/user/query/dto/user.dto';
import { UserRepository } from '../port/repository/user-repository';
import { UserLoginCommand } from 'src/application/user/command/user-login.command';
import { User } from '../model/user';
import { JwtService } from '@nestjs/jwt';
import { HttpStatus } from '@nestjs/common';
import { USER_NOT_FOUND } from 'src/domain/errors/common-messages';

export class LoginUserService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _jwtService: JwtService,
  ) {}

  async run(user: UserLoginCommand): Promise<UserDto> {
    const { email, password } = user;
    const usr = await this._userRepository.findByEmail(email);
    if (!usr) {
      throw new ValueRequiredError(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    await User.comparePassword(password, usr.password);

    const payload = { id: usr.id, name: usr.name, role: usr.role };
    const token = this._jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    return { ...usr, token };
  }
}
