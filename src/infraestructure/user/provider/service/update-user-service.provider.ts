import { UserRepository } from 'src/domain/user/port/repository/user-repository';
import { UpdateUserService } from 'src/domain/user/service/update-user-service';

export function updateUserServiceProvider(userRepository: UserRepository) {
  return new UpdateUserService(userRepository);
}
