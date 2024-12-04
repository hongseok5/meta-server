import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret_key';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  console.log("authenticateJWT")
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token)
  if (!token) {
    res.status(403).json({ message: '토큰이 제공되지 않았습니다.' });
    return
  }
  console.log("JWT SECRTE" + process.env.JWT_SECRET)
  try {
    jwt.verify(token, JWT_SECRET || '', (err: any, decoded: any) => {
      if (err) {
        return res.sendStatus(403);
      }
      
      (req as any).user = decoded; // Using 'any' type to bypass the typing issue
      next();
    });
  } catch (error) {
    res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    return
  }
};
