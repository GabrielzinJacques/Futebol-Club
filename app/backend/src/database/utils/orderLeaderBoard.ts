import ILeaderboard from '../interfaces/leaderboard';

const orderLeaderBoards = (leaderBoards: ILeaderboard[]) => leaderBoards
  .sort((a:ILeaderboard, b: ILeaderboard) => b.totalPoints - a.totalPoints
|| b.totalVictories - a.totalVictories
|| b.goalsBalance - a.goalsBalance
|| b.goalsFavor - a.goalsFavor);

export default orderLeaderBoards;
