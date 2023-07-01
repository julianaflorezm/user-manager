import { ValueRequiredError } from 'src/domain/errors/value-required-error';
import { UserDto } from 'src/application/user/query/dto/user.dto';
import { UserRepository } from '../port/repository/user-repository';
import { UserLoginCommand } from 'src/application/user/command/user-login.command';
import { User } from '../model/user';
import { JwtService } from '@nestjs/jwt';

export class LoginUserService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _jwtService: JwtService,
  ) {}

  async run(user: UserLoginCommand): Promise<UserDto> {
    const { email, password } = user;
    const usr = await this._userRepository.findByEmail(email);
    if (!usr) {
      throw new ValueRequiredError('User not found');
    }
    await User.comparePassword(password, usr.password);

    const payload = { id: usr.id, name: usr.name, role: usr.role };
    const token = this._jwtService.sign(payload, { secret: 'vass_secret' });
    return { ...usr, token };
  }
}
