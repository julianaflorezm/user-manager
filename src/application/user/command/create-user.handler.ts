import { Injectable } from '@nestjs/common';
import { UserDto } from '../query/dto/user.dto';
import { CreateUserService } from '../../../domain/user/service/create-user-service';
import { CreateUserCommand } from './create-user.command';
import { User } from '../../../domain/user/model/user';

@Injectable()
export class CreateUserHandler {
  constructor(private _createUserService: CreateUserService) {}

  async run(user: CreateUserCommand): Promise<UserDto> {
    return await this._createUserService.run(
      await User.create(user.name, user.password, user.email, user.phone, null),
      user.roleId,
    );
  }
}
