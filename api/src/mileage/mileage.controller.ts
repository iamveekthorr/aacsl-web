// import { LatLngLiteral } from '@googlemaps/google-maps-services-js';
import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Body, Delete, Param, Query } from '@nestjs/common/decorators';
import { CreateMileageDto } from '../dto/createMileage.dto';
import { JwtGuard } from '../guards/auth.guard';
import { MileageService } from './mileage.service';
import { RequestQueryObject } from '../dto/filterPaginationSort.dto';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { RolesGuard } from '../guards/role.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserDto } from '../dto/user.dto';
import { User } from '../user/user.entity';

@Controller('mileage')
export class MileageController {
  constructor(private readonly mileageService: MileageService) {}

  @Get('/')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.USER)
  @UseGuards(JwtGuard, RolesGuard)
  async getAllLocation(@Query() params: RequestQueryObject) {
    return this.mileageService.getAllLocationCoords(params);
  }

  @Get('/locations/me')
  @UseGuards(JwtGuard)
  async getMyLocations(
    @CurrentUser() user: UserDto,
    @Query() params: RequestQueryObject,
  ) {
    return this.mileageService.getMyLocations(user, params);
  }

  @Post('/')
  async createLocation(
    @Body() data: CreateMileageDto,
    @CurrentUser() user: User,
  ) {
    return await this.mileageService.createLocationCoords(data, user);
  }

  @Get('/:id')
  @UseGuards(JwtGuard)
  async getLocationById(@Param('id') id: string) {
    return await this.mileageService.getLocationById(id);
  }

  @Delete('/')
  @UseGuards(JwtGuard)
  async removeLocationById(@Param('id') id: string, user: UserDto) {
    return await this.mileageService.removeLocationById(id, user);
  }
}
