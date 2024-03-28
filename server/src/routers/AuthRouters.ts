import { Request, Response, Router } from 'express';
import CryptoJS from 'crypto-js';
import { UserServer } from '../servers/UserServer';

export const authRouters = Router(); 
const userService = new UserServer();

authRouters.post('/register', async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    await userService.findByEmail(userData.email);

    
    userData.password = CryptoJS.SHA256(userData.password).toString();
    
    const newUser = userService.register(userData);
    
    res.status(201).json(newUser);
  } catch {
    res.status(400).json({ error: 'The email is already registered.' });
    res.status(500).json({ error: '...' });
  }
})

authRouters.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashedPassword = CryptoJS.SHA256(password).toString();

  try {
    const data = await userService.login(email, hashedPassword);
    res.status(201).json(data);
  } catch {
    res.status(400).json({ error: '...' });
  }
})