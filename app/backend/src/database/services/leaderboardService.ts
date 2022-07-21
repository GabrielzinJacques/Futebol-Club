import Teams from '../models/TeamModel';
import Matches from '../models/MatchModel';
import { ITeamMatches } from '../interfaces/team';
import newLeaderboard from '../utils/leaderboard';

export default class LeaderboardService {
  public getAll = async () => {
    const matches = await Teams.findAll({
      include: { model: Matches, as: 'homeMatches', where: { inProgress: false } },
    }) as unknown as ITeamMatches[];

    const leaderboards = newLeaderboard(matches, true);

    return this.sortLeaderboards(leaderboards);
  };
}
