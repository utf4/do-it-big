export interface HttpResponse<T> {
    data: T;
    error?: Array<any>;
    message?: string;
    status?: boolean;
  }
