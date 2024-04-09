import { Request, Response } from 'express';
import { ProjectService } from '../servers/ProjectService';

const projectService = new ProjectService();

export class ProjectController {
    static async viewProjects(req: Request, res: Response): Promise<void> {
        const userId = req.params.userId;

        try {
            const projects = await projectService.viewProjects(Number(userId));
            res.status(200).json({ projects });
        } catch (error) {
            console.error('Error while fetching projects:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async addProject(req: Request, res: Response): Promise<void> {
        const userId = req.params.userId;
        const projectName = req.body.projectName;

        try {
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

    static async removeProject(req: Request, res: Response): Promise<void> {
        const userId = req.params.userId;
        const projectName = req.body.projectName;
        const mustBeDeleted = req.body.mustBeDeleted;

        try {
            if (mustBeDeleted) {
                await projectService.removeProject(Number(userId), projectName);
            }
            else {
                await projectService.leaveProject(Number(userId), projectName);
            }
            res.status(200).send('Success');
        } catch (error) {
            console.error('Error while removing project:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
