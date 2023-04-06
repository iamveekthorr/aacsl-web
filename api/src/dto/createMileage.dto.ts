import { IsBoolean, IsString } from 'class-validator';

export class CreateMileageDto {
  @IsString()
  startPosition: string;

  @IsString()
  endPosition: string;

  @IsBoolean()
  roundTrip: boolean;
}
