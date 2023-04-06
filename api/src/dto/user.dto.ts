import { IsBoolean, IsDate, IsEnum, IsString } from 'class-validator';
import { Role } from '../enums/role.enum';

export class UserDto {
  @IsString({ message: 'value must be of type string' })
  id: string;

  @IsString({ message: 'value must be of type string' })
  firstName: string;

  @IsString({ message: 'value must be of type string' })
  lastName: string;

  @IsString({ message: 'value must be of type string' })
  email: string;

  @IsEnum(Role)
  role: Role;

  @IsBoolean()
  isKycVerified: boolean;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
