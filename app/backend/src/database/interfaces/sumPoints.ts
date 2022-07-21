import IMatch from './match';

type teamStatus = 'homeTeamGoals' | 'awayTeamGoals';

export default interface ISumPoints {
  home: teamStatus;
  away: teamStatus;
  totalPoints: (a: number, b: IMatch) => number;
  totalVictories: (a: number, b: IMatch) => number;
  totalLosses: (a: number, b: IMatch) => number;
  totalDraws: (a: number, b: IMatch) => number;
  goalsFavor: (a: number, b: IMatch) => number;
  goalsOwn: (a: number, b: IMatch) => number;
}
