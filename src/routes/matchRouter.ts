import { Router } from 'express';
import * as matchController from '../controllers/matchController';

const matchRouter = Router();

matchRouter.post('/matches', matchController.getMatches);
matchRouter.post('/match', matchController.createMatch);
matchRouter.put('/match', matchController.updateMatch);
matchRouter.delete('/match', matchController.deleteMatch);

export default matchRouter;
