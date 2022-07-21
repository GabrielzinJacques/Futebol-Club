import ILeaderboard from '../interfaces/leaderboard';
import IMatch from '../interfaces/match';
import ISumPoints from '../interfaces/sumPoints';
import { ITeamMatches } from '../interfaces/team';

type allPoints = Omit<ILeaderboard, 'name' | 'goalsBalance' | 'efficiency'>;

const sumPoints: ISumPoints = {
  home: 'homeTeamGoals',
  away: 'awayTeamGoals',
  totalPoints: (a: number, b: IMatch) => {
    if (b[sumPoints.away] < b[sumPoints.home]) {
      return a + 3;
    }
    if (b[sumPoints.home] === b[sumPoints.away]) {
      return a + 1;
    }
    return a;
  },

  totalVictories: (a: number, b: IMatch) =>
    (b[sumPoints.home] > b[sumPoints.away] ? a + 1 : a),

  totalLosses: (a: number, b: IMatch) =>
    (b[sumPoints.home] < b[sumPoints.away] ? a + 1 : a),

  totalDraws: (a: number, b: IMatch) =>
    (b[sumPoints.home] === b[sumPoints.away] ? a + 1 : a),

  goalsFavor: (a: number, b: IMatch) => a + b[sumPoints.home],

  goalsOwn: (a: number, b: IMatch) => a + b[sumPoints.away],
};

const getPoints = (matches: IMatch[], home: boolean): allPoints => {
  if (home) {
    sumPoints.home = 'homeTeamGoals';
    sumPoints.away = 'awayTeamGoals';
  } else {
    sumPoints.home = 'awayTeamGoals';
    sumPoints.away = 'homeTeamGoals';
  }

  return {
    totalPoints: matches.reduce(sumPoints.totalPoints, 0),
    totalGames: matches.length,
    totalVictories: matches.reduce(sumPoints.totalVictories, 0),
    totalDraws: matches.reduce(sumPoints.totalDraws, 0),
    totalLosses: matches.reduce(sumPoints.totalLosses, 0),
    goalsFavor: matches.reduce(sumPoints.goalsFavor, 0),
    goalsOwn: matches.reduce(sumPoints.goalsOwn, 0),
  };
};

const newLeaderboard = (matches: ITeamMatches[], home: boolean): ILeaderboard[] => matches
  .map((team: ITeamMatches) => {
    const points = getPoints(team.awayMatches || team.homeMatches, home);

    return {
      name: team.teamName,
      ...points,
      goalsBalance: points.goalsFavor - points.goalsOwn,
      efficiency: Number(((points.totalPoints / (points.totalGames * 3)) * 100).toFixed(2)),
    };
  });

export default newLeaderboard;
