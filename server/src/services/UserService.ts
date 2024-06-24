import { User } from "../models/User";

interface UserRegistrationData {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
}

class UserService {
    async login(email: string, password: string): Promise<User> {      
        const user = await User.query().where('email', email).first();
        if (!user || password != user.password) {
            throw new Error ('invalid-credentials');
        }
        return user;
    }

    async register(userData: UserRegistrationData): Promise<User> {
        const newUser = await User.query().insert(userData);
        return newUser;
    }

    async getUserInfo(userId: number): Promise<User> {
        const user = await User.query().findById(userId);
        if (!user) {
            throw new Error('no-user');
        }
        return user;
    }

    async editUserInfo(userId: number, userData: UserRegistrationData): Promise<void> {
        // const user
    }
}

export default new UserService();