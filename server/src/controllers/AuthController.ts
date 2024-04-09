import { Request, Response } from 'express';
import CryptoJS from 'crypto-js';
import { UserService } from '../servers/UserService';

const userService = new UserService();

export class AuthController {
    static async register(req: Request, res: Response): Promise<void> {
        try {
            const userData = req.body;
            userData.password = CryptoJS.SHA256(userData.password).toString();   
            const newUser = await userService.register(userData);
            res.status(201).json(newUser);
        } catch(error: any) {
            if (error.constraint === 'users_email_unique') {
                res.status(400).json({error: 'already-used-email' });
            } else {
                res.status(500).json({error: 'Server error!' });
            }
        }
    }

    static async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        const hashedPassword = CryptoJS.SHA256(password).toString();

        try {
            const data = await userService.login(email, hashedPassword);
            res.status(201).json(data);
        } catch (error: any) {
            if (error.message === 'invalid-credentials') {
                res.status(400).json({error});
            } else {
                res.status(500).json({error: 'Server error' });
            }
        }
    }
}