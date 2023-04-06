import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { BusinessEntity } from './business.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessEntity]), HttpModule],
  providers: [BusinessService],
  controllers: [BusinessController],
})
export class BusinessModule {}
