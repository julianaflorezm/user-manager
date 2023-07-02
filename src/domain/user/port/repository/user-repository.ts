import { UserEntity } from '../../../../infraestructure/user/entity/user.entity';
import { UserDto } from '../../../../application/user/query/dto/user.dto';
import { User } from '../../model/user';

export abstract class UserRepository {
  abstract findAll(): Promise<UserDto[]>;
  abstract findUser(id: number): Promise<UserDto>;
  abstract deleteUser(id: number): Promise<boolean>;
  abstract create(user: User): Promise<UserDto>;
  abstract update(id: number, user: Partial<UserEntity>): Promise<UserDto>;
  abstract findByEmail(email: string): Promise<UserDto>;
}
