import { UserRepository } from 'domain/user/port/repository/user-repository';
import { DeleteUserService } from 'domain/user/service/delete-user-service';

export function deleteUserServiceProvider(userRepository: UserRepository) {
  return new DeleteUserService(userRepository);
}
