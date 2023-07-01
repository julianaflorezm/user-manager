import { UserRepository } from 'src/domain/user/port/repository/user-repository';
import { DeleteUserService } from 'src/domain/user/service/delete-user-service';

export function deleteUserServiceProvider(userRepository: UserRepository) {
  return new DeleteUserService(userRepository);
}
