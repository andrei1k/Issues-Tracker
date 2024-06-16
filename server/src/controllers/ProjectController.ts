import { Request, Response } from 'express';
import projectService from '../services/ProjectService';
import { isIdValid, isTitleValid } from '../utils/Validations';

class ProjectController {
    async viewProjects(req: Request, res: Response): Promise<void> {
        const userId = req.params.userId;
        
        if (!isIdValid(userId)) {
            res.status(400).json({ error: 'invalid-id' });
            return;
        }
        try {
            const projects = await projectService.viewProjects(Number(userId));
            res.status(200).json(projects);
        } catch (error) {
            console.error('Error while fetching projects:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async addProject(req: Request, res: Response): Promise<void> {
        const userId = req.params.userId;
        const projectName = req.body.projectName;

        try {
            if (!isTitleValid(projectName) || !isIdValid(userId)) {
                res.status(400).json({ error: 'invalid-data' });
                return;
            }
            await projectService.checkAlreadyCreated(projectName, Number(userId));
            await projectService.addProject(Number(userId), projectName);
            res.status(200).send('Success');
        } catch (error: any) {
            console.error('Error while adding project:', error);
            if (error.message === 'already-created-project') {
                res.status(400).json({ error: 'already-created-project' });
            } else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }

    async removeProject(req: Request, res: Response): Promise<void> {
        const userId = req.params.userId;
        const projectId = req.body.projectId;
        const mustBeDeleted = req.body.mustBeDeleted;
        
        if (!isIdValid(userId)) {
            res.status(400).json({ error: 'invalid-data' });
            return;
        }
        
        try {
            if (mustBeDeleted) {
                await projectService.removeProject(Number(userId), projectId);
            }
            else {
                await projectService.leaveProject(Number(userId), projectId);
            }
            res.status(200).send('Success');
        } catch (error) {
            console.error('Error while removing project:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async getAllUsersFromProject(req: Request, res: Response): Promise<void> {
        const projectId = req.body.projectId;
        try {
            const users = await projectService.getUsersFromProject(projectId);
            res.status(200).send(users);
        } catch (error) {
            res.status(500).json({error: 'Cannot get users'});
        }
    }
}


export default new ProjectController();