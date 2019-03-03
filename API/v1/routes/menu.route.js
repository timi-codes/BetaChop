import { Router } from 'express';
import MenuController from '../controllers/menu.controller';

const router = Router();

// router.get('/', MenuController.fetchMenu);
router.post('/', MenuController.setUpMenu);

export default router;
