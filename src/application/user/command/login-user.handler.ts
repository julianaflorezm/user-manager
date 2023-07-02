import { Injectable } from '@nestjs/common';
import { UserDto } from '../query/dto/user.dto';
import { UserLoginCommand } from './user-login.command';
import { LoginUserService } from '../../../domain/user/service/login-user-service';

@Injectable()
export class LoginUserHandler {
  constructor(private _loginUserService: LoginUserService) {}

  async run(user: UserLoginCommand): Promise<UserDto> {
    return await this._loginUserService.run(user);
  }
}
