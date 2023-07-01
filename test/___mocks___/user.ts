import { CreateUserCommand } from '../../src/application/user/command/create-user.command';
import { UserDto } from '../../src/application/user/query/dto/user.dto';
const date = new Date();

export const user: UserDto = {
  id: 1,
  name: '',
  email: '',
  phone: '123',
  role: {
    id: 1,
    name: '',
    created: date,
    updated: date,
  },
  password: '',
  created: date,
  updated: date,
};

export const userCommand: CreateUserCommand = {
  name: '',
  email: '',
  password: '',
  phone: '123',
  roleId: 1,
};
