import { UserRepository } from '../../../src/domain/user/port/repository/user-repository';
import { DeleteUserService } from '../../../src/domain/user/service/delete-user-service';
import { ValueRequiredError } from '../../../src/domain/errors/value-required-error';
import { user } from '../../___mocks___/user';
import {
  USER_ID_REQUIRED,
  USER_NOT_FOUND,
  USER_NOT_REMOVED,
} from '../../../src/domain/errors/common-messages';
import { HttpStatus } from '@nestjs/common';
import { BussinessError } from '../../../src/domain/errors/bussiness-error';

describe('DeleteUserService', () => {
  let deleteUserService: DeleteUserService;
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = {
      findAll: jest.fn(),
      findUser: jest.fn(),
      deleteUser: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      findByEmail: jest.fn(),
    };
    deleteUserService = new DeleteUserService(userRepository);
  });
  it('it should return info of delete user', async () => {
    (userRepository.findUser as jest.Mock).mockResolvedValue(user);
    (userRepository.deleteUser as jest.Mock).mockResolvedValue(user);
    const found = await deleteUserService.run(user.id);
    expect(found).toEqual(user);
    expect(userRepository.deleteUser).toHaveBeenCalled();
  });

  it('it should throw User not found if user to delete was not found', async () => {
    const id = 1;
    const error = new BussinessError(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    (userRepository.findUser as jest.Mock).mockRejectedValue(error);
    await expect(deleteUserService.run(id)).rejects.toThrowError(error);
    expect(userRepository.findUser).toHaveBeenCalledWith(id);
  });

  it('it should throw User id is reguired if id of use to delete was not provided', async () => {
    const error = new ValueRequiredError(
      USER_ID_REQUIRED,
      HttpStatus.BAD_REQUEST,
    );
    (userRepository.findUser as jest.Mock).mockRejectedValue(error);
    await expect(deleteUserService.run(0)).rejects.toThrowError(error);
  });

  it('it should throw User not deleted error', async () => {
    const error = new BussinessError(USER_NOT_REMOVED, HttpStatus.NOT_MODIFIED);
    (userRepository.findUser as jest.Mock).mockResolvedValue(user);
    (userRepository.deleteUser as jest.Mock).mockRejectedValue(error);
    await expect(deleteUserService.run(user.id)).rejects.toThrowError(error);
    expect(userRepository.deleteUser).toHaveBeenCalledWith(user.id);
  });
});
