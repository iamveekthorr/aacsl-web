import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsTrimmed } from '../../decorators/isTrimmed.decorator';
import { ErrorMessage } from '../../enums/error-messages.enum';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: ErrorMessage.PASSWORD_TOO_WEAK,
  })
  @IsTrimmed()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsTrimmed()
  confirmPassword: string;

  @IsNotEmpty({ message: ErrorMessage.FIELD_IS_REQUIRED })
  @IsEmail()
  @IsTrimmed()
  email: string;

  @IsString()
  @IsNotEmpty({ message: ErrorMessage.FIELD_IS_REQUIRED })
  @IsTrimmed()
  token: string;
}
