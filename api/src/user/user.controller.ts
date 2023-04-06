import { Controller, UseGuards, Get, Query, Param } from '@nestjs/common';
import { JwtGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/role.guard';
import { Roles } from '../decorators/roles.decorator';

import { UserService } from './user.service';

import { RequestQueryObject } from '../dto/filterPaginationSort.dto';

import { Role } from '../enums/role.enum';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @Roles(Role.USER)
  @UseGuards(JwtGuard, RolesGuard)
  async getUsers(@Query() query: RequestQueryObject) {
    return this.userService.getAllUsers(query);
  }

  @Get('/:id')
  @UseGuards(JwtGuard)
  async getUserById(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Get('/profile/me')
  @UseGuards(JwtGuard)
  async getUserProfile(@CurrentUser() user: User) {
    return await this.userService.getUserProfile(user.id);
  }
}
