import { Router } from 'express';
import OrderController from '../controllers/order.controller';

const router = Router();

router.post('/', OrderController.orderAMeal);
router.put('/:id', OrderController.updateAnOrder);

export default router;
