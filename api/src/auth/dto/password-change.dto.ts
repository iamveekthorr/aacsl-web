import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsTrimmed } from '../../decorators/isTrimmed.decorator';
import { ErrorMessage } from '../../enums/error-messages.enum';

export class PassWordChangeDTO {
  @IsString()
  @IsNotEmpty({ message: ErrorMessage.FIELD_IS_REQUIRED })
  @IsTrimmed()
  oldPassword: string;

  @IsString()
  @IsNotEmpty({ message: ErrorMessage.FIELD_IS_REQUIRED })
  @MinLength(8)
  @MaxLength(20)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: ErrorMessage.PASSWORD_TOO_WEAK,
  })
  @IsTrimmed()
  newPassword: string;

  @IsNotEmpty({ message: ErrorMessage.FIELD_IS_REQUIRED })
  @IsString()
  @IsTrimmed()
  confirmPassword: string;
}
