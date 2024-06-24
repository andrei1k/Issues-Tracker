import { Router } from 'express';
import userController from '../controllers/UserController';

export const userRouter = Router(); 
userRouter.get('/get-info/:userId', userController.getUserInfo);