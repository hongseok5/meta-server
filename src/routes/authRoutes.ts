import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

const router = express.Router();

// JWT 시크릿 키 및 만료 시간 설정
const JWT_SECRET = 'your_jwt_secret_key';
const JWT_EXPIRES_IN = '1h';

router.post(
  '/login',
  [
    body('id').notEmpty().withMessage('ID를 입력하세요.'),
    body('password').notEmpty().withMessage('비밀번호를 입력하세요.'),
  ],
  async (req: Request, res: Response): Promise<any> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, password } = req.body;

    try {
      const userRepository = AppDataSource.getRepository(User);
      console.log("test" + id)
      const user = await userRepository.findOneBy({ id: id });
      console.log(user)
      if (!user) {
        return res.status(401).json({ message: '유효하지 않은 ID입니다.' });
      }

      // 비밀번호 검증
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
      }

      // JWT 생성
      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

      res.json({ token, message: '로그인 성공' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  }
);

export default router;
