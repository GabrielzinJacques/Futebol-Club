import { Router } from 'express';
import MatchController from '../controllers/matchController';
import MatchService from '../services/matchService';
import validateToken from '../middlewares/validateToken';

const router = Router();

const match = new MatchController(new MatchService());

router.get('/matches', match.getAll);

router.post('/matches', validateToken, match.create);

export default router;
