import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { AddBusinessDto } from '../dto/add-business.dto';
import { BusinessService } from './business.service';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}
  @Post('/')
  addBusiness(@Body() data: AddBusinessDto) {
    return this.businessService.addBusiness(data);
  }

  @Get('/find-business-by-regNumber/:id')
  async findBusinessByRegNumber(@Param('id') id: string) {
    return await this.businessService.findBusinessByRegNumber(id);
  }
}
