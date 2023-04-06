export enum ErrorMessage {
  CUSTOM_SERVER_ERROR = `If you are seeing this, one of the devs is getting fired🙃🙃🙃!!!`,

  USER_ALREADY_EXISTS = 'Error Creating user!, duplicate account!',

  JWT_EXPIRED = 'jwt expired',

  UNIQUE_CONSTRAINT_VIOLATION = '2601',

  INVALID_LOGIN_CREDENTIALS = 'Invalid login credentials',

  NO_USER_FOUND = 'No user found with the credentials you provided!.',

  TOKEN_EXPIRED = 'This token is either invalid or expired and is no longer valid for this request!',

  PASSWORD_MISMATCH = 'Password and confirm password do not match.',

  ENTITY_ALREADY_EXIST = 'Entity cannot be created!.',

  MSSQL_EREQUEST = 'EREQUEST',

  FAILED_TO_SEND_EMAIL = 'Error sending this email!!!....retrying......',

  FIELD_IS_OF_TYPE_STRING = 'Field must be of type string',

  FIELD_IS_REQUIRED = 'This field is required!',

  PASSWORD_TOO_WEAK = 'password too weak!, password must have at least one lowercase character, one uppercase character, one special character eg:(@!#%$^&?_+|*><) and must be a minimum of 8 characters and maximum of 20 characters!',

  INVALID_PHONE_NUMBER_FORMAT = 'Phone number format is invalid!!',

  NO_MILEAGE_FOUND = 'No mileage found with that id!',
}
