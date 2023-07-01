import { UserController } from 'src/infraestructure/user/controller/user.controller';
import { GetUserListHandler } from 'src/application/user/query/get-user-list.handler';
import { UserDto } from 'src/application/user/query/dto/user.dto';
import { GetUserListService } from 'src/domain/user/service/get-user-list-service';
import { GetUserHandler } from 'src/application/user/query/get-user.handler';
import { GetUserService } from 'src/domain/user/service/get-user-service';
import { DeleteUserHandler } from 'src/application/user/command/delete-user.handler';
import { DeleteUserService } from 'src/domain/user/service/delete-user-service';
import { CreateUserService } from 'src/domain/user/service/create-user-service';
import { CreateUserHandler } from 'src/application/user/command/create-user.handler';
import { UpdateUserHandler } from 'src/application/user/command/update-user.handler';
import { UpdateUserService } from 'src/domain/user/service/update-user-service';
import { LoginUserHandler } from 'src/application/user/command/login-user.handler';
import { user, userCommand } from '../../___mocks___/user';

describe('UserController', () => {
  let getUserListHandler: GetUserListHandler;
  let userController: UserController;
  let getUserHandler: GetUserHandler;
  let deleteUserHandler: DeleteUserHandler;
  let createUserHandler: CreateUserHandler;
  let updateUserHandler: UpdateUserHandler;
  let getUserListService: GetUserListService;
  let getUserService: GetUserService;
  let deleteUserService: DeleteUserService;
  let createUserService: CreateUserService;
  let updateUserService: UpdateUserService;
  //let loginUserService: LoginUserService;
  let loginUserHandler: LoginUserHandler;

  beforeEach(async () => {
    updateUserHandler = new UpdateUserHandler(updateUserService);
    deleteUserHandler = new DeleteUserHandler(deleteUserService);
    getUserListHandler = new GetUserListHandler(getUserListService);
    getUserHandler = new GetUserHandler(getUserService);
    createUserHandler = new CreateUserHandler(createUserService);
    userController = new UserController(
      getUserListHandler,
      getUserHandler,
      deleteUserHandler,
      createUserHandler,
      updateUserHandler,
      loginUserHandler,
    );
  });

  it('/users/all (GET)', async () => {
    const result: Promise<UserDto[]> = new Promise((resolve) => {
      return resolve([user]);
    });
    jest.spyOn(getUserListHandler, 'run').mockImplementation(() => result);
    expect(await userController.getAll()).toBe(await result);
  });

  it('/users/:id (GET)', async () => {
    const id = 1;
    const result: Promise<UserDto> = new Promise((resolve) => resolve(user));
    jest.spyOn(getUserHandler, 'run').mockImplementation(() => result);
    expect(await userController.findOne(id)).toBe(await result);
  });

  it('/users/:id (DELETE)', async () => {
    const id = 1;
    const result: Promise<UserDto> = new Promise((resolve) => resolve(user));
    jest.spyOn(deleteUserHandler, 'run').mockImplementation(() => result);
    expect(await userController.deleteOne(id)).toBe(await result);
  });

  it('/users (POST)', async () => {
    const result: Promise<UserDto> = new Promise((resolve) => resolve(user));
    jest.spyOn(createUserHandler, 'run').mockImplementation(() => result);
    expect(await userController.create(userCommand)).toBe(await result);
  });

  it('/users (PUT)', async () => {
    const result: Promise<UserDto> = new Promise((resolve) => resolve(user));
    jest.spyOn(updateUserHandler, 'run').mockImplementation(() => result);
    expect(await userController.update((await result).id, userCommand)).toBe(
      await result,
    );
  });
});
