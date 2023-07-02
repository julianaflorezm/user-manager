import { UserRepository } from 'domain/user/port/repository/user-repository';
import { GetUserListService } from 'domain/user/service/get-user-list-service';

export function getUserListServiceProvider(userRepository: UserRepository) {
  return new GetUserListService(userRepository);
}
