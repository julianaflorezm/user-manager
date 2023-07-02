import { UserRepository } from 'domain/user/port/repository/user-repository';
import { UpdateUserService } from 'domain/user/service/update-user-service';

export function updateUserServiceProvider(userRepository: UserRepository) {
  return new UpdateUserService(userRepository);
}
