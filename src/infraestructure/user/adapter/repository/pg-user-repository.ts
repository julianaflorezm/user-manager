import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/domain/user/port/repository/user-repository';
import { UserEntity } from '../../entity/user.entity';
import { UserDto } from 'src/application/user/query/dto/user.dto';
import { User } from 'src/domain/user/model/user';
import { RoleEntity } from 'src/infraestructure/role/entity/role.entity';

@Injectable()
export class PgUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<UserDto> {
    const user = await this._userRepository.findOne({
      where: { email },
      relations: {
        role: true,
      },
    });
    return !user ? undefined : user;
  }

  async update(id: number, user: Partial<UserEntity>): Promise<UserDto> {
    return await this._userRepository.save({ id, ...user });
  }

  async create(user: User): Promise<UserDto> {
    const role = new RoleEntity();
    const {
      role: { id, name, created, updated },
    } = user;
    role.id = id;
    role.name = name;
    role.created = created;
    role.updated = updated;
    const entity = new UserEntity();
    entity.name = user.name;
    entity.email = user.email;
    entity.phone = user.phone;
    entity.role = role;
    entity.password = user.password;
    return await this._userRepository.save(entity);
  }

  async deleteUser(id: number): Promise<boolean> {
    return (await this._userRepository.delete(id)).affected === 1;
  }

  async findUser(id: number): Promise<UserDto> {
    const user = await this._userRepository.findOne({
      where: { id },
      relations: {
        role: true,
      },
    });
    return !user ? undefined : user;
  }

  async findAll(): Promise<UserDto[]> {
    return await this._userRepository.find({
      relations: {
        role: true,
      },
    });
  }
}
