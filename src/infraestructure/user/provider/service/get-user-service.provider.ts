import { UserRepository } from 'src/domain/user/port/repository/user-repository';
import { GetUserService } from 'src/domain/user/service/get-user-service';

export function getUserServiceProvider(userRepository: UserRepository) {
  return new GetUserService(userRepository);
}
