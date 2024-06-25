import { Project } from '../models/Project';
import { User } from '../models/User';
import { isEmailValid, isNameValid } from '../utils/Validations';

class ProjectService {
    async addProject(userId: number, projectName: string): Promise<void> {
        await User.relatedQuery('projects').for(userId).insert({title: projectName});
    }
    async viewProjects(userId: number): Promise<Project[] | undefined> {
        const user = await User.query().findById(userId);
        const projects = await user?.$relatedQuery('projects');
        return projects;
    }

    async viewSortedByDate(userId: number, increasing: boolean): Promise<Project[] | undefined> {
        const user = await User.query().findById(userId);
        let projects: Project[] | undefined;
        if (increasing === true) {
            projects = await user?.$relatedQuery('projects').orderBy('createdAt', 'desc');
        }
        else {
            projects = await user?.$relatedQuery('projects').orderBy('createdAt', 'asc');
        }

        return projects;
    }
    
    async viewSortedByName(userId: number, increasing: boolean): Promise<Project[] | undefined> {
        const user = await User.query().findById(userId);
        let projects: Project[] | undefined;
        if (increasing === true) {
            projects = await user?.$relatedQuery('projects').orderBy('title', 'desc');
        }
        else {
            projects = await user?.$relatedQuery('projects').orderBy('title', 'asc');
        }

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

    async removeProject(userId: number, projectId: number): Promise<void> {
        const user = await User.query().findById(userId);
        await user?.$relatedQuery('projects').deleteById(projectId);
    }

    async leaveProject(userId: number, projectId: number): Promise<void> {
        const user = await User.query().findById(userId);
        const project = await Project.query().findById(projectId);
        const projectUsers = await project?.$relatedQuery('users');

        if (projectUsers && projectUsers?.length > 1) {
            await user?.$relatedQuery('projects').unrelate().where('userProjects.projectId', projectId);
        } else {
            await user?.$relatedQuery('projects').deleteById(projectId);
        }
    }

    async getUsersFromProject(projectId: number): Promise<User[] | undefined> {
        const project = await Project.query().findById(projectId);
        const projectUsers = await project?.$relatedQuery('users');
        if (projectUsers !== undefined) {
            return projectUsers;
        }
        return undefined;
    }

    async addUserInProject(projectId: number, 
        firstName: string, 
        lastName:string, 
        email: string): Promise<void> 
    {
        if (!isEmailValid(email) ||
            !isNameValid(firstName) ||
            !isNameValid(lastName)) 
        {
            throw new Error('date-error');
        }
        const user = await User.query()
            .where('email', email)
            .where('firstName', firstName)
            .where('lastName', lastName).first();

        if (!user) {
            throw Error('user-doesnt-exist');
        }

        const project = await user
            .$relatedQuery('projects')
            .where('projects.id', projectId)
            .first();

        if (project) {
            throw Error('user-already-added');
        }
        else {
            await user.$relatedQuery('projects').relate(projectId);
        }
    }
}

export default new ProjectService();