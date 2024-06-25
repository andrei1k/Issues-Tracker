import { getToken, getUserId } from "../utils/Data.tsx";

export interface User {
    id: number;
    firstName: string;    
    lastName: string;
    email: string;
    createdAt: string;   
}

export class UserService {
    async getUser(): Promise<User> {
        const response = await fetch(`http://192.168.0.108:3001/users/get-info/${getUserId()}`, {
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

const userService = new UserService();
export default userService;