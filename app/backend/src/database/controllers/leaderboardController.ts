import { NextFunction, Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  private _service = new LeaderboardService();

  constructor(service: LeaderboardService) {
    this._service = service;
  }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderboard = await this._service.getAll();
      return res.status(200).json(leaderboard);
    } catch (error) {
      next(error);
    }
  };
}
