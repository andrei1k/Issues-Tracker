import { getToken } from "../utils/Data.tsx";

export interface Issue {
    id: number;
    title: string;
    description: string;
    priority: string;
    assignedTo: string;
    deadline: string;
}

export class IssueService {
    async getIssues(projectId: number): Promise<Issue[]> {
            const response = await fetch(`http://0.0.0.0:3001/projects/${projectId}/issues/all/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`
                }
            });
        
            if (!response.ok) {
                throw new Error('Error fetching issues');
            }

            return await response.json();
    }

    async getIssuesByAssignee(projectId: number, userId: number) {
        const response = await fetch(
            `http://0.0.0.0:3001/projects/${projectId}/issues/assignee/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Cannot get filtered issues by assignee');
        }

        return await response.json();

    }
    async getIssuesByPriority(projectId: number, priority: number) {
        const response = await fetch(
            `http://0.0.0.0:3001/projects/${projectId}/issues/priority/${priority}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error('Cannot get filtered issues by priority');
        }

        return await response.json();

    }

    async removeIssue(projectId: number, issueId: number): Promise<void> {
        const response = await fetch(`http://0.0.0.0:3001/projects/${projectId}/issues/remove/${issueId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error('Error removing project');
        }
    }
}

const issueService = new IssueService();
export default issueService;
