import { UserDetails } from './user.interface';

export interface ApiResponse {
  status: string;
  data: {
    count?: number;
    page?: number;
    totalPages?: number;
    documents?: any[];
    message?: string;
  };
}
