export interface AxiosError {
  response: {
    data: {
      error: string;
    };
  };
}
