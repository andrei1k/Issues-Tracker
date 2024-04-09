import { Request, Response, Router } from 'express';
import CryptoJS from 'crypto-js';
import { UserService } from '../servers/UserService';

export const authRouters = Router(); 
const userService = new UserService();

authRouters.post('/register', async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    
    userData.password = CryptoJS.SHA256(userData.password).toString();   
    const newUser = await userService.register(userData);
    
    res.status(201).json(newUser);
  } catch(error: any) {
    if (error.constraint === 'users_email_unique') {
      res.status(400).json({error: 'already-used-email' });
    }
      res.status(500).json({error: 'Server error!' });
  }
})

authRouters.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashedPassword = CryptoJS.SHA256(password).toString();

  try {
    const data = await userService.login(email, hashedPassword);
    res.status(201).json(data);
  } catch (error: any) {
    if (error.message === 'invalid-credentials') {
      res.status(400).json({error});
    }
    else {
      res.status(500).json({error: 'Server error' });
    }
  }
})