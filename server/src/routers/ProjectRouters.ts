import { Request, Response, Router } from 'express';
import { ProjectService } from '../servers/ProjectService';

export const projectRouters = Router();

const projectService = new ProjectService();

projectRouters.get('/view/:userId', async (req: Request, res: Response) => {
    const userId = req.params.userId;

    try {
        const projects = await projectService.viewProjects(Number(userId));
        res.status(200).json({ projects }); 

    } catch (error) {
        console.error('Error while fetching projects:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

projectRouters.post("/add/:userId", async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const projectName = req.body.projectName;

    try {
        await projectService.checkAlreadyCreated(projectName, Number(userId));
        await projectService.addProject(Number(userId), projectName);
        res.status(200).send('Success.');

    } catch (error: any) {
        console.error('Error while adding project:', error);
        if (error.message === 'already-created-project') {
            res.status(400).json({error: 'already-created-project'});
        } else {
            res.status(500).json({error: 'Internal Server Error!'});
        }
    }
});

projectRouters.delete('/remove/:userId', async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const projectName = req.body.projectName;

    // should we add logic for shared projects ?
    
    try {
        await projectService.removeProject(Number(userId), projectName);
        res.status(200).send('Success');
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error!'});
    }
});

