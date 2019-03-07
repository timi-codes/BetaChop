import { Router } from 'express';
import MealController from '../controllers/meal.controller';
import AuthMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/', AuthMiddleware, MealController.fetchAllMeals);
router.post('/', AuthMiddleware, MealController.addAMeal);
router.get('/:id', AuthMiddleware, MealController.getAMeal);
router.put('/:id', AuthMiddleware, MealController.updateAMeal);
router.delete('/:id', AuthMiddleware, MealController.deleteAMeal);

export default router;
