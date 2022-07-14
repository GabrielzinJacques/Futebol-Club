import { NextFunction, Request, Response } from 'express';
import generateError from '../utils/generateError';
import Jwt from '../utils/jwt';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const messageErr = 'Token must be a valid token';
  try {
    const jwt = new Jwt();

    const { authorization } = req.headers;

    if (!authorization) next(generateError(401, messageErr));

    jwt.decode(authorization as string);

    next();
  } catch (error) {
    res.status(401).json({ message: messageErr });
  }
};

export default validateToken;
