import { Router, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

const router = Router();
const userRepository = AppDataSource.getRepository(User);

// Create a new User
router.post('/users', async (req: Request, res: Response): Promise<any> => {
  const user = userRepository.create(req.body);

  try {
    const savedUser = await userRepository.save(user);
    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(500).json({ message: 'Error saving user', error });
  }
});

// Update an existing User
router.put('/users/:id', async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

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
});

// Delete a User
router.delete('/users/:id', async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const user = await userRepository.findOneBy({ id: parseInt(id) });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await userRepository.remove(user);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting user', error });
  }
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
