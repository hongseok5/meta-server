import { Router } from 'express';
import * as teamController from '../controllers/teamController'


const router = Router();

router.post('/player', teamController.createPlayer);
router.post('/team', teamController.createTeam);
router.get('/players', teamController.getPlayers);
router.get('/team', teamController.getTeam);
router.get('/player', teamController.getPlayerDetails);

export default router;
