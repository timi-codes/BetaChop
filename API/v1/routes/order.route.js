import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import AuthMiddleware from '../middlewares/authMiddleware';
import PermissionMiddleWare from '../middlewares/permissionMiddleware';
import OrderTimerMiddleWare from '../middlewares/orderTimerMiddleWare';

const router = Router();

router.get('/', AuthMiddleware, PermissionMiddleWare, OrderController.fetchAllOrders);
router.post('/', AuthMiddleware, OrderTimerMiddleWare, OrderController.orderAMeal);
router.put('/:id', AuthMiddleware, OrderTimerMiddleWare, OrderController.updateAnOrder);

export default router;
