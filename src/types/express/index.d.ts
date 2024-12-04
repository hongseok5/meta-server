import { JwtPayload } from 'jsonwebtoken';
import { User } from '../entities/User'; // User 엔티티를 가져옵니다.

declare namespace Express {
    export interface Request {
      user?: User;  // 또는 구체적인 타입을 정의해 줄 수 있습니다
    }
  }
