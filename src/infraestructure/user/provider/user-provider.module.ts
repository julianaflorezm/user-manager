import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { userRepositoryProvider } from './repository/user-repository.provider';
import { UserRepository } from 'domain/user/port/repository/user-repository';
import { GetUserListService } from 'domain/user/service/get-user-list-service';
import { getUserListServiceProvider } from './service/get-user-list-service.provider';
import { GetUserListHandler } from 'application/user/query/get-user-list.handler';
import { GetUserService } from 'domain/user/service/get-user-service';
import { getUserServiceProvider } from './service/get-user-service.provider';
import { GetUserHandler } from 'application/user/query/get-user.handler';
import { DeleteUserService } from 'domain/user/service/delete-user-service';
import { deleteUserServiceProvider } from './service/delete-user-service.provider';
import { DeleteUserHandler } from 'application/user/command/delete-user.handler';
import { CreateUserService } from 'domain/user/service/create-user-service';
import { createUserServiceProvider } from './service/create-user-service.provider';
import { CreateUserHandler } from 'application/user/command/create-user.handler';
import { UserMapper } from '../adapter/mapper/user-mapper';
import { UpdateUserService } from 'domain/user/service/update-user-service';
import { updateUserServiceProvider } from './service/update-user-service.provider';
import { UpdateUserHandler } from 'application/user/command/update-user.handler';
import { JwtModule } from '@nestjs/jwt';
import { LoginUserService } from 'domain/user/service/login-user-service';
import { loginUserServiceProvider } from './service/login-user-service.provider';
import { JwtService } from '@nestjs/jwt';
import { LoginUserHandler } from 'application/user/command/login-user.handler';
import { JwtStrategy } from 'infraestructure/auth/jwt-strategy';
import { RoleEntity } from 'infraestructure/role/entity/role.entity';
import { roleRepositoryProvider } from 'infraestructure/role/provider/repository/role-repository.provider';
import { RoleRepository } from 'domain/role/port/repository/role-repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([RoleEntity]),
    UserMapper,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    {
      provide: GetUserListService,
      inject: [UserRepository],
      useFactory: getUserListServiceProvider,
    },
    {
      provide: GetUserService,
      inject: [UserRepository],
      useFactory: getUserServiceProvider,
    },
    {
      provide: DeleteUserService,
      inject: [UserRepository],
      useFactory: deleteUserServiceProvider,
    },
    {
      provide: CreateUserService,
      inject: [UserRepository, RoleRepository],
      useFactory: createUserServiceProvider,
    },
    {
      provide: UpdateUserService,
      inject: [UserRepository],
      useFactory: updateUserServiceProvider,
    },
    {
      provide: LoginUserService,
      inject: [UserRepository, JwtService],
      useFactory: loginUserServiceProvider,
    },
    UserMapper,
    JwtStrategy,
    GetUserHandler,
    LoginUserHandler,
    DeleteUserHandler,
    CreateUserHandler,
    UpdateUserHandler,
    GetUserListHandler,
    userRepositoryProvider,
    roleRepositoryProvider,
  ],
  exports: [
    GetUserService,
    GetUserHandler,
    UserRepository,
    LoginUserHandler,
    LoginUserService,
    CreateUserHandler,
    CreateUserService,
    UpdateUserHandler,
    UpdateUserService,
    DeleteUserService,
    DeleteUserHandler,
    GetUserListService,
    GetUserListHandler,
  ],
})
export class UserProviderModule {}
