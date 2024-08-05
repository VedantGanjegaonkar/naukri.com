
import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import { ApplicationController} from '../controller/application.controller';

const userController = new ApplicationController();

const router = Router();

router.post('/:id', userController.applyForJobPost);
router.delete('/:id', userController.deleteJobApplication);

export default router