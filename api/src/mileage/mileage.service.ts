// import { LatLngLiteral } from '@googlemaps/google-maps-services-js';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMileageDto } from '../dto/createMileage.dto';
import { ErrorMessage } from '../enums/error-messages.enum';
import { AppError } from '../utils/appError.util';
import { Repository } from 'typeorm';
import { Mileage } from './mileage.entity';
import { SuccessMessages } from '../enums/success-messages.enum';
import { ApiFeaturesService } from '../utils/api-features.service';
import { RequestQueryObject } from '../dto/filterPaginationSort.dto';
import { UserDto } from '../dto/user.dto';
import { User } from '../user/user.entity';

@Injectable()
export class MileageService {
  constructor(
    @InjectRepository(Mileage)
    private readonly mileageRepository: Repository<Mileage>,
  ) {}

  async getAllLocationCoords(params: RequestQueryObject) {
    const queryBuilder = this.mileageRepository.createQueryBuilder(
      Mileage.name,
    );
    const apiFeatures = new ApiFeaturesService<Mileage>();
    const [entities, count, page] = await apiFeatures.findFiltered(
      queryBuilder,
      params,
    );

    const documents = entities;

    return { count, page, documents };
  }

  async getMyLocations(user: UserDto, params: RequestQueryObject) {
    const queryBuilder = this.mileageRepository.createQueryBuilder(
      Mileage.name,
    );
    const qb = queryBuilder.select().where({ user });
    const apiFeatures = new ApiFeaturesService<Mileage>();
    const [entities, count, page] = await apiFeatures.findFiltered(qb, params);

    const documents = entities;

    return { count, page, documents };
  }

  async createLocationCoords(data: CreateMileageDto, user: User) {
    const { startPosition, endPosition, roundTrip } = data;
    const mileage = this.mileageRepository.create({
      startPosition,
      endPosition,
      roundTrip,
      user,
    });
    await this.mileageRepository.save(mileage);

    return SuccessMessages.MILEAGE_CREATED_SUCCESSFULLY;
  }

  async getLocationById(id: string) {
    const mileage = await this.mileageRepository.findOne({
      where: { id },
    });

    if (!mileage) {
      throw new AppError(ErrorMessage.NO_MILEAGE_FOUND, HttpStatus.NOT_FOUND);
    }

    return mileage;
  }

  async removeLocationById(id: string, user: UserDto) {
    const mileage = await this.mileageRepository.findOne({
      where: { id, user },
    });

    if (!mileage) {
      throw new AppError(ErrorMessage.NO_MILEAGE_FOUND, HttpStatus.NOT_FOUND);
    }

    await this.mileageRepository.delete(mileage);

    return 'Deleted Successfully';
  }
}
