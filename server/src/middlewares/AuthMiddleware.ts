import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils'; 

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    verifyToken(token);
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid key' });
  }
}
