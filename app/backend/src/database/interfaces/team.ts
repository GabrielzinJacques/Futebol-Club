import IMatch from './match';

export interface ITeams {
  id: number;
  teamName: string;
}

export interface ITeamMatches extends ITeams{
  homeMatches: IMatch[]
  awayMatches: IMatch[]
}
