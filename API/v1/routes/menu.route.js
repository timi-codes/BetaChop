import { Router } from 'express';
import MenuController from '../controllers/menu.controller';
import AuthMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/', AuthMiddleware, MenuController.fetchMenu);
router.post('/', AuthMiddleware, MenuController.setUpMenu);

export default router;
