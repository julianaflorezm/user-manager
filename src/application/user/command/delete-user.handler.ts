import { Injectable } from '@nestjs/common';
import { DeleteUserService } from 'src/domain/user/service/delete-user-service';
import { UserDto } from '../query/dto/user.dto';

@Injectable()
export class DeleteUserHandler {
  constructor(private _deleteUserService: DeleteUserService) {}

  async run(id: number): Promise<UserDto> {
    return await this._deleteUserService.run(id);
  }
}
