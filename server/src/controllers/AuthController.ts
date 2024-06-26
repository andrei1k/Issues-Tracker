import { Request, Response } from 'express';
import CryptoJS from 'crypto-js';
import userService from '../services/UserService';
import { createToken } from '../utils/jwtUtils';
import { isPasswordStrong, isNameValid, isEmailValid } from '../utils/Validations';

class AuthController {
    async register(req: Request, res: Response): Promise<void> {
        try {
            const userData = req.body;
            if (!isEmailValid(userData.email) 
                || !isNameValid(userData.firstName) 
                || !isNameValid(userData.lastName) 
                || !isPasswordStrong(userData.password)) {
                res.status(400).json({ error: 'invalid-data' });
                return;
            }
            userData.password = CryptoJS.SHA256(userData.password).toString();   
            const userId = await userService.register(userData);

            const token = createToken(userId);
            res.status(201).json({userId, token});
        } catch(error: any) {
            if (error.message === 'Error while register!') {
                res.status(400).json({error: 'already-used-email' });
            } else {
                res.status(500).json({error: 'Server error!' });
            }
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        const hashedPassword = CryptoJS.SHA256(password).toString();

        try {
            const userId = await userService.login(email, hashedPassword);

            const token = createToken(userId);
            res.status(201).json({userId, token});
        } catch (error: any) {
            if (error.message === 'invalid-credentials') {
                res.status(400).json({error});
            } else {
                res.status(500).json({error: 'Server error' });
            }
        }
    }
}

export default new AuthController();
