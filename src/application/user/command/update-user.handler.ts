import { Injectable } from '@nestjs/common';
import { UserDto } from '../query/dto/user.dto';
import { CreateUserCommand } from './create-user.command';
import { UpdateUserService } from '../../../domain/user/service/update-user-service';

@Injectable()
export class UpdateUserHandler {
  constructor(private _updateUserService: UpdateUserService) {}

  async run(id: number, user: Partial<CreateUserCommand>): Promise<UserDto> {
    return await this._updateUserService.run(id, user);
  }
}
