import { User } from "../models/User";

interface UserRegistrationData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export class UserService {
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
}