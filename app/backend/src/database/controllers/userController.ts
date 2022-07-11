import { NextFunction, Request, Response } from 'express';
import UserService from '../services/userService';
import Jwt from '../utils/jwt';

export default class UserController {
  private _service = new UserService();
  private _jwt = new Jwt();

  constructor(service: UserService) {
    this._service = service;
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const { password, email } = req.body;
    try {
      const token = await this._service.login(password, email);
      console.log(token);

      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };

  public loginValidate = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    try {
      const { data } = this._jwt.decode(authorization as string);
      res.status(200).json({ role: data.role });
    } catch (error) {
      next(error);
    }
  };
}
