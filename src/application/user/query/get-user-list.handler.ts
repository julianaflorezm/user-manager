import { Injectable } from '@nestjs/common';
import { GetUserListService } from '../../../domain/user/service/get-user-list-service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class GetUserListHandler {
  constructor(private _getUserListService: GetUserListService) {}

  async run(): Promise<UserDto[]> {
    return await this._getUserListService.run();
  }
}
