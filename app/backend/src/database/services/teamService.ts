import Teams from '../models/TeamModel';

export default class TeamService {
  public getAll = async () => {
    const teams = await Teams.findAll();
    return teams;
  };

  public getById = async (id: number) => {
    const team = await Teams.findByPk(id);

    return team;
  };
}
