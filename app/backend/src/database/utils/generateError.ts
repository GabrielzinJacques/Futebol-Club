import IError from '../interfaces/error';

export default (statusCode: number, message: string): IError => ({
  message,
  statusCode,
  name: 'LINT',
});
