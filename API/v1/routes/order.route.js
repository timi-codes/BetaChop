import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import AuthMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/', AuthMiddleware, OrderController.fetchAllOrders);
router.post('/', AuthMiddleware, OrderController.orderAMeal);
router.put('/:id', AuthMiddleware, OrderController.updateAnOrder);

export default router;
