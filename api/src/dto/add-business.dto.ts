import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { IsTrimmed } from '../decorators/isTrimmed.decorator';
import { ErrorMessage } from '../enums/error-messages.enum';

export class AddBusinessDto {
  @IsString({ message: ErrorMessage.FIELD_IS_OF_TYPE_STRING })
  @IsNotEmpty({ message: ErrorMessage.FIELD_IS_REQUIRED })
  @IsTrimmed()
  name: string;

  @IsString({ message: ErrorMessage.FIELD_IS_OF_TYPE_STRING })
  @IsNotEmpty({ message: ErrorMessage.FIELD_IS_REQUIRED })
  @IsPhoneNumber('GB', { message: ErrorMessage.INVALID_PHONE_NUMBER_FORMAT })
  @IsTrimmed()
  phoneNumber: string;
}
