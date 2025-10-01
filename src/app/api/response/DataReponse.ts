export class DataResponse<T> {
  status: number;
  message: string;
  data?: T | T[];

  constructor(status: number, message: string, data?: T | T[]) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
