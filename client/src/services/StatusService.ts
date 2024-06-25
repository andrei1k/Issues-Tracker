import { getToken } from "../utils/Data.tsx";

export interface Status {
    id: number
    name: string
    createdAt: Date
    followingStatuses?: Status[]
}

export class StatusService {

    async getStatuses(): Promise<Status[]> {
        const response = await fetch(`http://192.168.0.108:3001/statuses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}` 
            },
        })

        if (!response.ok) {
            throw new Error('Error fetching projects');
        }

        return await response.json();
    }

    async addWorkFlowConnection(fromStatus: number, toStatus: number): Promise<void> {

        const response = await fetch(`http://localhost:3001/statuses/flow`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}` 
            },
            body: JSON.stringify({from: fromStatus, to: toStatus}),
        })

        if (!response.ok) {
            throw new Error('Error adding');
        }
    }

    async removeWorkFlowConnection(fromStatus: number, toStatus: number): Promise<void> {

        const response = await fetch(`http://localhost:3001/statuses/flow`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}` 
            },
            body: JSON.stringify({from: fromStatus, to: toStatus}),
        })

        if (!response.ok) {
            throw new Error('Error deleting');
        }
    }

    async addStatus(status: string): Promise<void> {

        const response = await fetch(`http://localhost:3001/statuses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}` 
            },
            body: JSON.stringify({status}),
        })

        if (!response.ok) {
            throw new Error('Error adding');
        }
    }

    async removeStatus(status: number): Promise<void> {

        const response = await fetch(`http://localhost:3001/statuses`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}` 
            },
            body: JSON.stringify({status}),
        })

        if (!response.ok) {
            throw new Error('Error deleting');
        }
    }
}

const statusService = new StatusService();
export default statusService;