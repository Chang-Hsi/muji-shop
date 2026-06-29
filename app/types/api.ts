// app/types/api.ts

export type ApiStatus = {
  Code: number;
  Message: string;
};

export type ApiResponse<T> = {
  Status: ApiStatus;
  Data: T;
};