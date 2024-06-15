import { getToken } from "../utils/Data.tsx";

export interface Project {
    id: Number;
    title: string;
    createdAt: string;
}

export class ProjectService {
    async viewProjects(userId: number): Promise<Project[]> {
        const response = await fetch(`http://localhost:3001/projects/view/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}` 
            }
        });
    
        if (!response.ok) {
            throw new Error('Error fetching projects');
        }
        return await response.json();
    }

    async removeProject(userId: number, projectName: string, mustBeDeleted: boolean) {
            const response = await fetch(`http://localhost:3001/projects/remove/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}` 
                },
                body: JSON.stringify( {projectName, mustBeDeleted} )
            });

            if (!response.ok) {
                throw new Error('Error deleting projects');
            }        
    };

    async addProject(userId:number, projectName: string) {
        if (projectName === '') {
            throw new Error('empty-string');
        }
        const response = await fetch(`http://localhost:3001/projects/add/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({ projectName })
        });

        if (response.status === 400) {
            throw new Error('already-used-name');
        }

        if (!response.ok) {
            throw new Error('Error creating project');
        }
    }
};

const projectService = new ProjectService();
export default projectService;