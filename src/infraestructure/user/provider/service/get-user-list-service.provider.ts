import { UserRepository } from 'src/domain/user/port/repository/user-repository';
import { GetUserListService } from 'src/domain/user/service/get-user-list-service';

export function getUserListServiceProvider(userRepository: UserRepository) {
  return new GetUserListService(userRepository);
}
