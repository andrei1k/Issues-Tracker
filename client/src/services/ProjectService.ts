import { getToken } from "../utils/Data.tsx";

export interface Project {
    id: number;
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

    async viewSortedProjectsByDate(userId: number, increasing: boolean) {
        const wayOfSort = increasing  ? 'increasing' : 'decreasing';
        const response = await fetch(
                `http://localhost:3001/projects/view/sorted-date/${wayOfSort}/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}` 
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching sorted projects by date');
        }

        return await response.json();
    }

    async viewSortedProjectsByName(userId: number, increasing: boolean) {
        const wayOfSort = increasing ? 'a-z' : 'z-a';

        const response = await 
            fetch(`http://localhost:3001/projects/view/sorted-name/${wayOfSort}/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}` 
            },
        });

        if (!response.ok) {
            throw new Error('Error fetching sorted projects by name');
        }

        return await response.json();
    }

    async removeProject(userId: number, projectId: number, mustBeDeleted: boolean) {
            const response = await fetch(`http://localhost:3001/projects/remove/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}` 
                },
                body: JSON.stringify( {projectId, mustBeDeleted} )
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

    async getUsersFromProject(projectId: number) {
            const response = await fetch(`http://localhost:3001/projects/users`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`,
              },
              body: JSON.stringify({ projectId })
            });
    
            if (!response.ok) {
              throw new Error("Failed to fetch users");
            }
    
            return await response.json();
    }

    async addUserInProject(projectId: number, firstName: string, lastName: string, email: string) {
        const response = await fetch(`http://localhost:3001/projects/add-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`,
            },
            body: JSON.stringify({projectId, firstName, lastName, email})
        });

        if (response.status === 400) {
            throw new Error('User is already added');
        }
        else if (response.status === 404) {
            throw new Error('User is not found');
        }
        else if(!response.ok) {            
            throw new Error("Failed to add user in project");
        }
    }
};

const projectService = new ProjectService();
export default projectService;