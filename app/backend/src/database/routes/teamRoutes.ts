import { Router } from 'express';
import TeamController from '../controllers/teamController';
import TeamsService from '../services/teamService';

const router = Router();

const team = new TeamController(new TeamsService());

router.get('/teams', team.getAll);

router.get('/teams/:id', team.getById);

export default router;
