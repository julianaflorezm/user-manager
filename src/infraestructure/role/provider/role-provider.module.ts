import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { roleRepositoryProvider } from './repository/role-repository.provider';
import { RoleEntity } from 'src/infraestructure/role/entity/role.entity';
import { RoleRepository } from 'src/domain/role/port/repository/role-repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [roleRepositoryProvider],
  exports: [RoleRepository],
})
export class RoleProviderModule {}
