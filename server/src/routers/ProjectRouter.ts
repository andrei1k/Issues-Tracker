import { Router } from 'express';
import { ProjectController } from '../controllers/ProjectController';

export const projectRouter = Router();

projectRouter.get('/view/:userId', ProjectController.viewProjects);
projectRouter.post('/add/:userId', ProjectController.addProject);
projectRouter.delete('/remove/:userId', ProjectController.removeProject);
