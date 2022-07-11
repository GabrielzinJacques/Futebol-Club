import { NextFunction, Request, Response } from 'express';
import generateError from '../utils/generateError';

const validateLogin = (req: Request, _res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(generateError(400, 'All fields must be filled'));
  }
  next();
};

export default validateLogin;
