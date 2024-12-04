import { Router, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

const router = Router();
const userRepository = AppDataSource.getRepository(User);
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

// Create a new User
router.post('/signup', 
  [
    body('id')
      .isLength({ min: 8, max: 16 })
      .matches(/^[a-zA-Z0-9]+$/)
      .withMessage('ID는 8자 이상 16자 미만의 영문자와 숫자 조합이어야 합니다.'),
    body('name').notEmpty().withMessage('닉네임을 입력해주세요.'),
    body('password')
      .matches(passwordRegex)
      .withMessage('비밀번호는 8자 이상 16자 미만이며, 영문자, 숫자, 특수문자가 각각 하나 이상 포함되어야 합니다.'),
  ],  

  async (req: Request, res: Response): Promise<any> => {
    console.log("test")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors)
      return res.status(400).json({ errors: errors.array() });
    }
  const { id, name, password } = req.body;
  console.log(req.body)
  try {
    const userRepository = AppDataSource.getRepository(User);

    // 중복 ID 검사
    const existingUser = await userRepository.findOneBy({ name: id });
    if (existingUser) {
      return res.status(409).json({ message: '이미 사용 중인 ID입니다.' });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 새로운 사용자 생성
    const newUser = userRepository.create({
      id : id,
      name: name,
      password: hashedPassword,
      role: 'user', // 기본 역할 설정
    });
    console.log(newUser)
    // 사용자 저장
    await userRepository.save(newUser);

    res.status(201).json({ message: '회원가입이 완료되었습니다.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// Update an existing User
router.put('/users/:id', async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  /*
  try {
    const user = await userRepository.findOneBy({ id: parseInt(id) });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    userRepository.merge(user, req.body);
    const updatedUser = await userRepository.save(user);
    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating user', error });
  }
    */
});

// Delete a User
router.delete('/users/:id', async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  // try {
  //   const user = await userRepository.findOneBy({ id: parseInt(id) });
  //   if (!user) {
  //     return res.status(404).json({ message: 'User not found' });
  //   }

  //   await userRepository.remove(user);
  //   return res.status(204).send();
  // } catch (error) {
  //   return res.status(500).json({ message: 'Error deleting user', error });
  // }
});

router.get('/users', async (req: Request, res: Response): Promise<any> => {

  try {

    const users = await userRepository.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting user', error });
  }
});
export default router;
