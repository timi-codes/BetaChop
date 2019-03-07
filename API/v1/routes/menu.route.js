import { Router } from 'express';
import MenuController from '../controllers/menu.controller';
import AuthMiddleware from '../middlewares/authMiddleware';
import PermissionMiddleWare from '../middlewares/permissionMiddleware';

const router = Router();

router.get('/', AuthMiddleware, MenuController.fetchMenu);
router.post('/', AuthMiddleware, PermissionMiddleWare, MenuController.setUpMenu);

export default router;
