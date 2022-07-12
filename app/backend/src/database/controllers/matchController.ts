import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/matchService';

export default class MatchController {
  private _service = new MatchService();

  constructor(service: MatchService) {
    this._service = service;
  }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    const { inProgress } = req.query;
    try {
      const matches = await this._service.getAll(inProgress as string);
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };
}
