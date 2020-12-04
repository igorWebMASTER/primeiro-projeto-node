import { Router } from 'express';

import SessionController from '../controllers/SessionController';

const sessionsController = new SessionController();
const SessionRouter = Router();

SessionRouter.post('/', sessionsController.create);

export default SessionRouter;
