import { IsBoolean, IsString } from 'class-validator';

export class UpdateMileageDto {
  @IsString({ message: 'value must be a string' })
  startPosition: string;

  @IsString({ message: 'value must be a string' })
  endPosition: string;

  @IsBoolean()
  roundTrip: boolean;
}
