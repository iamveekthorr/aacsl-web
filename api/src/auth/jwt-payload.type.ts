import { Role } from '../enums/role.enum';

export type JWTPayload = {
  // make sub userId
  sub: string;
  role: Role;
};
