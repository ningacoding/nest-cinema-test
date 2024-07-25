export class ResponseSerializer {
  statusCode: number;
  error?: string;
  message?: string;
  data?: any;
  links?: {
    next: string;
  };

  constructor(partial: Partial<ResponseSerializer>) {
    Object.assign(this, partial);
  }
}
