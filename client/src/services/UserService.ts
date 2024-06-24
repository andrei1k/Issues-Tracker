import { getToken } from "../utils/Data.tsx";

export interface User {
    id: number;
    firstName: string;    
    lastName: string;
    email: string;
    createdAt: string;   
}

export class UserService {
    async getUser(): Promise<User> {
        const response = await fetch(`http://127.0.0.1:3001/`, {
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
}