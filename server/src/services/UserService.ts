import { User } from "../models/User";

interface UserRegistrationData {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
}

class UserService {
    async login(email: string, password: string): Promise<User> {      
        try {
            const user = await User.query().where('email', email).first();
            if (!user || password != user.password) {
                throw ('invalid-credentials');
            }
            return user;
        }
        catch(err: any) {
            if (err === 'invalid-credentials') {
                throw new Error('invalid-credentials');
            }
            throw new Error('Error while login!');
        }
    }

    async register(userData: UserRegistrationData): Promise<User> {
        try {
            const newUser = await User.query().insert(userData);
            return newUser;
        }
        catch(err) {
            throw new Error('Error while register!');
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

    async editUserInfo(userId: number, userData: UserRegistrationData): Promise<void> {
        // const user
    }
}

export default new UserService();