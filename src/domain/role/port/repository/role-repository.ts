import { RoleDto } from 'src/application/role/query/dto/role.dto';

export abstract class RoleRepository {
  abstract findRole(id: number): Promise<RoleDto>;
}
