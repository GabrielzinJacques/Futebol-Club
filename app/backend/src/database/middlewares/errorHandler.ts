import { NextFunction, Request, Response } from 'express';
import IError from '../interfaces/error';

const errorHandler = (error: IError, _req: Request, res: Response, _next: NextFunction) => {
  if (error.statusCode) return res.status(error.statusCode).json({ message: error.message });

  res.status(500).json({ message: error.message });
};

export default errorHandler;
