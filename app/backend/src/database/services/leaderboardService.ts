import Teams from '../models/TeamModel';
import Matches from '../models/MatchModel';
import { ITeamMatches } from '../interfaces/team';
import newLeaderboard from '../utils/leaderboard';
import orderLeaderboards from '../utils/orderLeaderBoard';

export default class LeaderboardService {
  public getAll = async () => {
    const response = await Teams.findAll({
      include: { model: Matches, as: 'homeMatches', where: { inProgress: false } },
    }) as unknown as ITeamMatches[];

    const leaderboards = newLeaderboard(response, true);

    return orderLeaderboards(leaderboards);
  };
}
