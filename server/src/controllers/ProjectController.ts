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

    async getSortByDate(req: Request, res: Response): Promise<void> {
        const userId = req.params.userId;
        const order = req.params.order;
         try {
            if (order === 'increasing') {
                const projects = await projectService.viewSortedByDate(parseInt(userId), true);
                res.status(200).json(projects);
            }
            else if(order === 'decreasing') {
                const projects = await projectService.viewSortedByDate(parseInt(userId), false);
                res.status(200).json(projects);
            }
        } catch(error) {
            res.status(500).json( {error: 'error-getting-projects'} );
        }
    }

    async getSortByName(req: Request, res: Response): Promise<void> {
        const userId=req.params.userId;
        const order = req.params.order;
        try {
            if (order === 'a-z') {
                const projects = await projectService.viewSortedByName(parseInt(userId), true);
                res.status(200).json(projects);
            }
            else if(order === 'z-a') {
                const projects = await projectService.viewSortedByName(parseInt(userId), false);
                res.status(200).json(projects);
            }
        } catch(error) {
            res.status(500).json( {error: 'error-getting-projects'} );
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
        } catch (error: any) {
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
            res.status(500).json({ error: 'Cannot get users' });
        }
    }

    async addUserInProject(req: Request, res: Response): Promise<void> {
        const projectId = req.body.projectId;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        try {
            await projectService.addUserInProject(projectId, firstName, lastName, email);
            res.status(200).send();
        } catch (error: any) {
            if (error.message === 'user-doesnt-exist') {
                res.status(404).json({error: 'User does not exist!'});
            }
            else if(error.message === 'user-already-added') {
                res.status(400).json({error: 'User is already added!'});
            }
            else {
                res.status(500).json({error: 'Cannot add user in project'});
            }
        }
    }
}


export default new ProjectController();