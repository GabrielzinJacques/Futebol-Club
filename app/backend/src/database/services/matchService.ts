import Match from '../models/MatchModel';
import Team from '../models/TeamModel';

export default class MatchService {
  // https://stackoverflow.com/questions/42661141/findall-include-more-tables-on-sequelize-query

  public getAll = async (inProgress: string) => {
    const response = await Match.findAll({
      include: [
        { model: Team, attributes: ['teamName'], as: 'teamAway' },
        { model: Team, attributes: ['teamName'], as: 'teamHome' },
      ],
    });

    if (inProgress === 'true') {
      console.log('entrou em true');
      const matches = response.filter((match) => match.inProgress === 1);
      return matches;
    }
    if (inProgress === 'false') {
      console.log('entrou em false');

      const matches = response.filter((match) => match.inProgress === 0);
      return matches;
    } console.log('todaxxx');
    return response;
  };
}
