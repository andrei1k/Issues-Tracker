import { Request, Response } from 'express';
import userService from "../services/UserService";

class UserController {
    async getUserInfo(req: Request, res: Response) {
        const userId = req.params.userId;
        try {
            const userInfo = await userService.getUserInfo(parseInt(userId));
            res.status(200).json(userInfo);
        }
        catch(err) {
            console.error('Error while getting userData:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getUserStats(req: Request, res: Response) {
        const userId = req.params.userId;
        try {
            const userStats = await userService.getUserStats(parseInt(userId));
            res.status(200).json(userStats);
        }
        catch(err) {
            console.error('Error while getting userStats:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new UserController();
