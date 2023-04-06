import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { IsTrimmed } from '../../decorators/isTrimmed.decorator';
import { ErrorMessage } from '../../enums/error-messages.enum';

export class AuthCredentialsDTO {
  @IsNotEmpty({ message: ErrorMessage.FIELD_IS_REQUIRED })
  @IsString()
  @IsEmail()
  @IsTrimmed()
  email: string;

  @IsNotEmpty({ message: ErrorMessage.FIELD_IS_REQUIRED })
  @IsString()
  @IsTrimmed()
  password: string;
}
