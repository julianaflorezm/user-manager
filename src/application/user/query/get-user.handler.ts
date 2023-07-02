import { Injectable } from '@nestjs/common';
import { GetUserService } from '../../../domain/user/service/get-user-service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class GetUserHandler {
  constructor(private _getUserService: GetUserService) {}

  async run(id: number): Promise<UserDto> {
    return await this._getUserService.run(id);
  }
}
