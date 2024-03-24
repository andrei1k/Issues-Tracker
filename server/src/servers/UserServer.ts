import { User } from "../models/User";

export class UserServer {


    async login(username: string, password: string): Promise<User | undefined> {
        
        const user = await User.query().where('username', username).first()

        return user
    }
}