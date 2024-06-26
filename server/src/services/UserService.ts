import { User } from "../models/User";


interface UserStatsServiceModel {
    projects: number;
    issues: number;
}

interface UserRegistrationData {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
}

class UserService {
    async login(email: string, password: string): Promise<number> {      
        try {
            const user = await User.query().where('email', email).first();
            if (!user || password != user.password) {
                throw ('invalid-credentials');
            }
            return user.id;
        }
        catch(err: any) {
            if (err === 'invalid-credentials') {
                throw new Error('invalid-credentials');
            }
            throw new Error('Error while login!');
        }
    }

    async register(userData: UserRegistrationData): Promise<number> {
        try {
            const newUser = await User.query().insert(userData);
            return newUser.id;
        }
        catch(err: any) {
            if (err.constraint === 'users_email_unique') {
                throw new Error('Error while register!');
            }

            throw new Error('Server error!');

        }
    }

    async getUserInfo(userId: number): Promise<User> {
        try {
            const user = await User.query().findById(userId);
            if (!user) {
                throw ('no-user');
            }
            return user;
        }
        catch (err) {
            if (err === 'no-user') {
                throw new Error('no-user');
            }
            throw new Error('Error while getting userInfo!');
        }
    }

    async getUserStats(userId: number): Promise<UserStatsServiceModel> {
        try {
            const user = await User.query().findById(userId);
            if (!user) {
                throw ('no-user');
            }

            const userStats = {
                projects: await user.$relatedQuery('projects').resultSize(),
                issues: await user.$relatedQuery('issues').resultSize()
            };
            return userStats;
        }
        catch (err) {
            if (err === 'no-user') {
                throw new Error('no-user');
            }
            throw new Error('Error while getting userStats!');
        }
    }
}

export default new UserService();