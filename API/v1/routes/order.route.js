import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import AuthMiddleware from '../middlewares/authMiddleware';
import PermissionMiddleWare from '../middlewares/permissionMiddleware';

const router = Router();

router.get('/', AuthMiddleware, PermissionMiddleWare, OrderController.fetchAllOrders);
router.post('/', AuthMiddleware, OrderController.orderAMeal);
router.put('/:id', AuthMiddleware, OrderController.updateAnOrder);

export default router;
