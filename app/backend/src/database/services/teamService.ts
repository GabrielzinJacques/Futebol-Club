import Teams from '../models/TeamModel';
// import generateError from '../utils/generateError';

export default class TeamsService {
  public getAll = async () => {
    const teams = await Teams.findAll();
    return teams;
  };

  public getById = async (id: number) => {
    const team = await Teams.findByPk(id);

    return team;
  };
}
