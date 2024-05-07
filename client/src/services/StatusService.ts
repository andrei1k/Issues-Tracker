export interface Status {
    id: number
    name: string
    createdAt: Date
    followingStatuses?: Status[]
}

export class StatusService {

    async getStatuses(): Promise<Status[]> {
        const response = await fetch(`http://localhost:3001/statuses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error('Error fetching projects');
        }

        return await response.json();
    }
}