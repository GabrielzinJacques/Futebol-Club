import IMatch from '../interfaces/match';
import Match from '../models/MatchModel';
import Team from '../models/TeamModel';
import generateError from '../utils/generateError';

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
      const matches = response.filter((match) => match.inProgress === 1);
      return matches;
    }
    if (inProgress === 'false') {
      const matches = response.filter((match) => match.inProgress === 0);
      return matches;
    }
    return response;
  };

  public finished = async (id: number) => {
    await Match.update({ inProgress: 0 }, { where: { id } });
  };

  public create = async (match: IMatch) => {
    if (match.awayTeam === match.homeTeam) {
      throw generateError(401, 'It is not possible to create a match with two equal teams');
    }

    const isMatch = await Match.findAll({ where: { id: [match.awayTeam, match.homeTeam] } });

    if (!isMatch[1]) throw generateError(404, 'There is no team with such id!');

    const newMatch = {
      ...match, inProgress: true,
    };

    const response = await Match.create(newMatch);
    return response;
  };
}
