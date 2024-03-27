import { Request, Response, Router } from 'express';
import { UserServer } from '../servers/UserServer'; 

export const userRouter = Router();
const userService = new UserServer();

userRouter.get('/users', async (req: Request, res: Response) => {
    userService.login('sasha', 'parolina').then(data => {
    console.log(`molodca ${data?.firstName}`);
    res.send(data);
    });
});