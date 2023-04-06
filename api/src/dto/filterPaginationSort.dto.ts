import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class RequestQueryObject {
  @IsOptional()
  @IsString()
  filters?: { [key: string]: unknown };

  @IsOptional()
  @IsString()
  fields?: string;

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsNumberString()
  page?: string;
}
