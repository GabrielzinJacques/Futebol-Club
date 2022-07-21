import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';
import LeaderboardService from '../services/leaderboardService';

const router = Router();

const leaderBoard = new LeaderboardController(new LeaderboardService());

router.get('/leaderboard/home', leaderBoard.getAll);

export default router;
