import { IP_ADDRESS, getToken, getUserId, UserStatsViewModel } from "../utils/Data.ts";

export interface User {
    id: number;
    firstName: string;    
    lastName: string;
    email: string;
    createdAt: string;   
}

export class UserService {
    async getUser(): Promise<User> {
        const response = await fetch(`http://${IP_ADDRESS}:3001/users/get-info/${getUserId()}`, {
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

    async getUserStats(): Promise<UserStatsViewModel> {
        const response = await fetch(`http://${IP_ADDRESS}:3001/users/stats/${getUserId()}`, {
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