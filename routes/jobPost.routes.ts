
import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import { jobPostController} from '../controller/jobPost.controller';

const userController = new jobPostController();

const router = Router();

router.post('/create', userController.createJobPost);
router.delete('/delete/:id', userController.deleteJobPost);

export default router