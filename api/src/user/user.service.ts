import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { ApiFeaturesService } from '../utils/api-features.service';
import { RequestQueryObject } from '../dto/filterPaginationSort.dto';

import { ErrorMessage } from '../enums/error-messages.enum';
import { AppError } from '../utils/appError.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(data: RequestQueryObject) {
    const resultsPerPage = Math.ceil(Number(data.limit || 10));
    const queryBuilder = this.userRepository.createQueryBuilder(User.name);

    const apiFeatures = new ApiFeaturesService<User>();

    const [entities, count, page] = await apiFeatures.findFiltered(
      queryBuilder,
      data,
    );

    const documents = entities;

    const totalPages = Math.ceil(count / resultsPerPage);

    return { count, page, totalPages, documents };
  }

  async getUserById(userId: string) {
    const query = this.userRepository
      .createQueryBuilder(User.name)
      .select()
      .where({ id: userId });

    const user = await query.getOne();

    if (!user)
      throw new AppError(ErrorMessage.NO_USER_FOUND, HttpStatus.NOT_FOUND);

    return user;
  }

  async getUserProfile(id: string) {
    // Use JOIN clause to ensure that the mileage fetched as well
    const query = this.userRepository
      .createQueryBuilder(User.name)
      .leftJoinAndSelect(`${User.name}.mileage`, 'mileage')
      .where({ id });

    const user = await query.getOne();

    if (!user)
      throw new AppError(ErrorMessage.NO_USER_FOUND, HttpStatus.NOT_FOUND);

    return user;
  }
}
