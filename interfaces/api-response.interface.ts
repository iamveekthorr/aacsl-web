export interface ApiResponse {
  status: string;
  data: { [key: string]: any };
}

export interface ApiBaseResponse {
  status: string;
  data: {
    count?: number;
    page?: number;
    totalPages?: number;
    documents?: any[];
    message?: string;
  };
}
