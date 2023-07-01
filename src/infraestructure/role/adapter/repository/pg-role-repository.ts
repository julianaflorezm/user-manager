import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RoleRepository } from 'src/domain/role/port/repository/role-repository';
import { RoleEntity } from 'src/infraestructure/role/entity/role.entity';
import { RoleDto } from 'src/application/role/query/dto/role.dto';

@Injectable()
export class PgRoleRepository implements RoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly _roleRepository: Repository<RoleEntity>,
  ) {}

  async findRole(id: number): Promise<RoleDto> {
    const role = await this._roleRepository.findOne({
      where: { id },
    });
    return !role ? undefined : role;
  }
}
