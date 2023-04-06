import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { RequestQueryObject } from '../dto/filterPaginationSort.dto';
import { SortOrder } from '../enums/sort-order.enum';

@Injectable()
export class ApiFeaturesService<T> {
  async findFiltered(
    queryBuilder: SelectQueryBuilder<T>,
    queryObj?: RequestQueryObject,
  ) {
    this.applyFilters(queryBuilder, queryObj.filters);
    this.applySorting(queryBuilder, queryObj.sort);
    this.applyPagination(
      queryBuilder,
      parseInt(queryObj.page),
      parseInt(queryObj.limit),
    );

    const page = parseInt(queryObj.page) || 1;

    if (queryObj.fields) {
      return await this.applyFieldLimiting(queryBuilder, queryObj.fields, page);
    }

    const [entities, count] = await queryBuilder.getManyAndCount();

    return [entities, count, page];
  }

  private applyFilters(
    queryBuilder: SelectQueryBuilder<T>,
    filters: { [key: string]: unknown },
  ) {
    if (filters) {
      const values = JSON.parse(filters.toString());

      Object.entries(values).map(([key, value]) => {
        queryBuilder.andWhere(`${key} = :${key}`, { [key]: value });
      });
    }
  }

  private applySorting(queryBuilder: SelectQueryBuilder<T>, sort: string) {
    if (sort) {
      const [key, value] = sort.split(':');

      const { columns } = queryBuilder.expressionMap.mainAlias.metadata;

      const metadata = columns.map((column) => column.propertyName);

      if (metadata.some((val) => val === key)) {
        queryBuilder.orderBy(key, value as SortOrder.ASC | SortOrder.DESC);
      }
    } else {
      queryBuilder.orderBy('createdAt', SortOrder.ASC);
    }
  }

  private async applyFieldLimiting(
    queryBuilder: SelectQueryBuilder<T>,
    fields: string,
    page = 1,
  ) {
    const values = fields.split(',');

    const { columns } = queryBuilder.expressionMap.mainAlias.metadata;

    const metadata = columns.map((column) => column.propertyName);

    if (metadata.some((value) => values.includes(value))) {
      const documents = await queryBuilder.select(values).execute();

      const count = documents.length;

      return [documents, count, page];
    }
  }

  private applyPagination(
    queryBuilder: SelectQueryBuilder<T>,
    page: number,
    limit: number,
  ) {
    if (!page || !limit) {
      page = 1;
      limit = 10;
    }
    const offset = (page - 1) * limit;
    queryBuilder.skip(offset).take(limit);
  }
}
