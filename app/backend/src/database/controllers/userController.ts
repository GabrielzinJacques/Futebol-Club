import { NextFunction, Request, Response } from 'express';
import UserService from '../services/userService';

export default class UserController {
  private _service = new UserService();

  constructor(service: UserService) {
    this._service = service;
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const { password, email } = req.body;
    try {
      const user = await this._service.login(password, email);
      return res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  };
}
