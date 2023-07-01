import { UserRepository } from 'src/domain/user/port/repository/user-repository';
import { LoginUserService } from 'src/domain/user/service/login-user-service';
import { JwtService } from '@nestjs/jwt';

export function loginUserServiceProvider(
  userRepository: UserRepository,
  jwtService: JwtService,
) {
  return new LoginUserService(userRepository, jwtService);
}
