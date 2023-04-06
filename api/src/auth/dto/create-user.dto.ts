import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsTrimmed } from '../../decorators/isTrimmed.decorator';
import { ErrorMessage } from '../../enums/error-messages.enum';

export class CreateUserDTO {
  @IsString({ message: ErrorMessage.FIELD_IS_OF_TYPE_STRING })
  @IsNotEmpty({ message: ErrorMessage.FIELD_IS_REQUIRED })
  @IsTrimmed()
  firstName: string;

  @IsString({ message: ErrorMessage.FIELD_IS_OF_TYPE_STRING })
  @IsNotEmpty({ message: ErrorMessage.FIELD_IS_REQUIRED })
  @IsTrimmed()
  lastName: string;

  @IsString()
  @IsNotEmpty({ message: ErrorMessage.FIELD_IS_REQUIRED })
  @MinLength(8)
  @MaxLength(20)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: ErrorMessage.PASSWORD_TOO_WEAK,
  })
  @IsTrimmed()
  password: string;

  @IsString()
  @IsNotEmpty({ message: ErrorMessage.FIELD_IS_REQUIRED })
  @IsEmail()
  @IsTrimmed()
  email: string;

  @IsDateString()
  @IsNotEmpty({ message: ErrorMessage.FIELD_IS_REQUIRED })
  @IsTrimmed()
  dob: Date;
}
