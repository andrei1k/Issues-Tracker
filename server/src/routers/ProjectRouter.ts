import { Router } from 'express';
import projectController from '../controllers/ProjectController';
import { issueProjRouter } from '../routers/IssueRouters';;


export const projectRouter = Router();

projectRouter.get('/view/:userId', projectController.viewProjects);
projectRouter.get('/view/sorted-date/:order/:userId', projectController.getSortByDate);
projectRouter.get('/view/sorted-name/:order/:userId', projectController.getSortByName);
projectRouter.post('/add/:userId', projectController.addProject);
projectRouter.delete('/remove/:userId', projectController.removeProject);
projectRouter.post('/users', projectController.getAllUsersFromProject);
projectRouter.post('/add-user', projectController.addUserInProject);
projectRouter.use('/:projectId/issues', issueProjRouter);
