import { Project } from '../models/Project';
import { User } from '../models/User';

export class ProjectService {
    async addProject(userId: number, projectName: string): Promise<void> {
        await User.relatedQuery('projects').for(userId).insert({title: projectName});
    }
    async viewProjects(userId: number): Promise<Project[] | undefined> {
        const user = await User.query().findById(userId);
        const projects = await user?.$relatedQuery('projects');
        return projects;
    }

    async checkAlreadyCreated(projectName: string, userId: number): Promise<void> {
        const user = await User.query().findById(userId);
        const projects = await user?.$relatedQuery('projects');
        const isProjectNameUnique = projects?.every(project => project.title !== projectName);
        if (!isProjectNameUnique) {
            throw new Error('already-created-project');
        }        
    }

    async removeProject(userId: number, projectName: string): Promise<void> {
        const user = await User.query().findById(userId);
        // await user?.$relatedQuery('projects').unrelate().where('title', projectName);
        await user?.$relatedQuery('projects').delete().where('title', projectName);
    }
}