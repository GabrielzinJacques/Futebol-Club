import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/teamService';

export default class TeamController {
  private _service = new TeamService();

  constructor(service: TeamService) {
    this._service = service;
  }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await this._service.getAll();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };
}
