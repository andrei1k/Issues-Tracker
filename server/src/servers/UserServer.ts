import { User } from "../models/User";

interface UserRegistrationData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export class UserServer {

    async login(email: string, password: string): Promise<User | undefined> {
        
        const user = await User.query().where('email', email).first();
        if (!user || password != user.password) {
            throw Error ('Wrong email or password!');
        }
        return user;
    }

    async register(userData: UserRegistrationData): Promise<User> {

        const newUser = await User.query().insert(userData);
        return newUser;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return await User.query().findOne({ email });
    }
}