import { Router } from 'express';
import projectController from '../controllers/ProjectController';
import { issueProjRouter } from '../routers/IssueRouters';;


export const projectRouter = Router();

projectRouter.get('/view/:userId', projectController.viewProjects);
projectRouter.post('/add/:userId', projectController.addProject);
projectRouter.delete('/remove/:userId', projectController.removeProject);
projectRouter.post('/users', projectController.getAllUsersFromProject);

projectRouter.use('/:projectId/issues', issueProjRouter);
