import React, { useEffect, useState } from "react";
// import { Status, StatusService } from "../services/StatusService";

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

export function WorkFlow() {

    const [data, setData] = useState<Status[]>()

    const a = async () => {
            const statusService = new StatusService()
            const statuses = await statusService.getStatuses()
            setData(statuses)
            console.log(statuses);
            
        }

    useEffect(() => {
        

        a()
    }, [data?.length])

    return (
        <>
        {data ? data.map(status => {
            
            return <div key={status.id}>
                <p>{status.id}</p>
                <p>{status.name}</p>
                
            </div>
        }) : <p>lolo</p>}
        </>
    )
}