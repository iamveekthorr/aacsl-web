import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';

import { BusinessEntity } from './business.entity';

import { AddBusinessDto } from '../dto/add-business.dto';
import { SuccessMessages } from '../enums/success-messages.enum';
import { CompanyDetails } from './company-details.dto';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(BusinessEntity)
    private readonly businessRepository: Repository<BusinessEntity>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  async addBusiness(data: AddBusinessDto) {
    const business = this.businessRepository.create(data);
    await this.businessRepository.save(business);

    return SuccessMessages.BUSINESS_CREATED_SUCCESSFULLY;
  }

  async findBusinessByRegNumber(regNumber: string) {
    // make an AIP call to companies house
    const { data } = await firstValueFrom(
      this.httpService.get<CompanyDetails>(
        `${this.configService.get<string>(
          'COMPANIES_HOUSE_URL',
        )}/company/${regNumber}`,
        {
          headers: {
            Authorization: `Basic ${this.configService.get<string>(
              'COMPANIES_HOUSE_TOKEN',
            )}`,
          },
        },
      ),
    );
    return data;
  }
}
