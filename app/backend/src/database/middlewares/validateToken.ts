import { NextFunction, Request, Response } from 'express';
import generateError from '../utils/generateError';
import Jwt from '../utils/jwt';

const validateToken = (req: Request, _res: Response, next: NextFunction) => {
  const jwt = new Jwt();

  const { authorization } = req.headers;

  if (!authorization) next(generateError(401, 'Token must be a valid token'));

  const token = jwt.decode(authorization as string);

  if (!token) next(generateError(401, 'Token must be a valid token'));

  next();
};

export default validateToken;
