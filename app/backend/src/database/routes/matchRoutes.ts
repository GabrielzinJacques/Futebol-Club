import { Router } from 'express';
import MatchController from '../controllers/matchController';
import MatchService from '../services/matchService';

const router = Router();

const match = new MatchController(new MatchService());

router.get('/matches', match.getAll);

export default router;
