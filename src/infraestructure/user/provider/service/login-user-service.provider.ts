import { UserRepository } from 'domain/user/port/repository/user-repository';
import { LoginUserService } from 'domain/user/service/login-user-service';
import { JwtService } from '@nestjs/jwt';

export function loginUserServiceProvider(
  userRepository: UserRepository,
  jwtService: JwtService,
) {
  return new LoginUserService(userRepository, jwtService);
}
