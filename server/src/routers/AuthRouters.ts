import { Request, Response, Router } from 'express';
import CryptoJS from 'crypto-js';
import { UserServer } from '../servers/UserServer';

export const authRouters = Router(); 
const userService = new UserServer();

authRouters.post('/register', async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const existingUser = await userService.findByEmail(userData.email);

    if (existingUser) {
      return res.status(400).json({ error: 'The email is already registered.' });
    }

    userData.password = CryptoJS.SHA256(userData.password).toString();

    const newUser = userService.register(userData);

    res.status(201).json(newUser);
  } catch {
    res.status(500).json({ error: '...' });
  }
})

authRouters.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashedPassword = CryptoJS.SHA256(password).toString();

  try {
    const data = await userService.login(email, hashedPassword);
    res.send(data);
  } catch {
    res.status(500).json({ error: '...' });
  }
})