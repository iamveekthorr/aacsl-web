type User = {
  user: UserDetails;
  tokens: { accessToken: string; refreshToken: string };
};

export interface UserDetails {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
}

export default User;
