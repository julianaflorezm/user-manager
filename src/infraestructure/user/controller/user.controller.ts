import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetUserListHandler } from 'src/application/user/query/get-user-list.handler';
import { UserDto } from 'src/application/user/query/dto/user.dto';
import { GetUserHandler } from 'src/application/user/query/get-user.handler';
import { DeleteUserHandler } from 'src/application/user/command/delete-user.handler';
import { CreateUserHandler } from 'src/application/user/command/create-user.handler';
import { CreateUserCommand } from 'src/application/user/command/create-user.command';
import { UpdateUserHandler } from 'src/application/user/command/update-user.handler';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserLoginCommand } from 'src/application/user/command/user-login.command';
import { LoginUserHandler } from 'src/application/user/command/login-user.handler';
import { JwtAuthGuard } from 'src/infraestructure/auth/jwt-auth-guard';
import { Roles } from 'src/infraestructure/role/decorator/role.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly _getUserListHandler: GetUserListHandler,
    private readonly _getUserHandler: GetUserHandler,
    private readonly _deleteUserHandler: DeleteUserHandler,
    private readonly _createUserHandler: CreateUserHandler,
    private readonly _updateUserHandler: UpdateUserHandler,
    private readonly _loginUserHandler: LoginUserHandler,
  ) {}

  @Get('all')
  @ApiOperation({ summary: 'Find all users' })
  @ApiResponse({
    status: 200,
    description: 'Find all users persisted on database',
    type: UserDto,
  })
  @UseGuards(JwtAuthGuard)
  @UseGuards(AuthGuard('jwt'))
  @Roles('ADMIN')
  async getAll(): Promise<UserDto[]> {
    return await this._getUserListHandler.run();
  }

  @Get(':id')
  @UseGuards()
  @ApiOperation({ summary: 'Find user by id identifier' })
  @ApiResponse({
    status: 200,
    description: 'Find user by id persisted on database',
    type: UserDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found on database or id required',
  })
  @ApiNotAcceptableResponse({
    description: 'User id must be a number',
  })
  @UseGuards(JwtAuthGuard)
  @UseGuards(AuthGuard('jwt'))
  @Roles('ADMIN', 'EMPLOYEE', 'CUSTOMER')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<UserDto> {
    return await this._getUserHandler.run(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete user by id identifier' })
  @ApiResponse({
    status: 200,
    description: 'Delete user by id persisted on database',
    type: UserDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found on database or id required',
  })
  @ApiNotAcceptableResponse({
    description: 'User id must be a number',
  })
  @UseGuards(JwtAuthGuard)
  @UseGuards(AuthGuard('jwt'))
  @Roles('ADMIN', 'EMPLOYEE')
  async deleteOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<UserDto> {
    return await this._deleteUserHandler.run(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({
    description: 'User persisted on database',
    type: UserDto,
  })
  async create(
    @Body()
    user: CreateUserCommand,
  ): Promise<UserDto> {
    return await this._createUserHandler.run(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'Update user persisted on database',
    type: UserDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found on database or id required',
  })
  @ApiNotAcceptableResponse({
    description: 'User id must be a number',
  })
  @UseGuards(JwtAuthGuard)
  @UseGuards(AuthGuard('jwt'))
  @Roles('ADMIN', 'EMPLOYEE', 'CUSTOMER')
  async update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() user: Partial<CreateUserCommand>,
  ): Promise<UserDto> {
    return await this._updateUserHandler.run(id, user);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  async login(
    @Body()
    user: UserLoginCommand,
  ): Promise<UserDto> {
    return await this._loginUserHandler.run(user);
  }
}
