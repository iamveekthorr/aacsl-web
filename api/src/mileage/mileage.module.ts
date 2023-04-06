import { Module } from '@nestjs/common';
import { MileageService } from './mileage.service';
import { MileageController } from './mileage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mileage } from './mileage.entity';
// import { GoogleMapsModule } from '../google-maps/google-maps.module';

@Module({
  imports: [TypeOrmModule.forFeature([Mileage])],
  controllers: [MileageController],
  exports: [MileageService],
  providers: [MileageService],
})
export class MileageModule {}
