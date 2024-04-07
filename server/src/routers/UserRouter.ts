import { Request, Response, Router } from 'express';
import { UserService } from '../servers/UserService'; 

export const userRouter = Router();
const userService = new UserService();

userRouter.get('/users', async (req: Request, res: Response) => {
    userService.login('sasha', 'parolina').then(data => {
    console.log(`molodca ${data?.firstName}`);
    res.send(data);
    });
});