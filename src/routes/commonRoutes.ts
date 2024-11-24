import { Router, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Menu } from '../entity/Menu';
const router = Router();
const menuRepository = AppDataSource.getRepository(Menu);

// Create a new User
router.get('/menu', async (req: Request, res: Response): Promise<any> => {
  const menu = menuRepository.find(req.body);

  try {
    const menus = await menuRepository.find({
      order: {
          menu_seq: 'ASC', // 오름차순 정렬
      },
  });
    return res.status(200).json(menus);
  } catch (error) {
    return res.status(500).json({ message: 'Error saving user', error });
  }
});


export default router;
