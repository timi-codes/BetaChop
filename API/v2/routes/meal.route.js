import { Router } from 'express';
import MealController from '../controllers/meal.controller';

const router = Router();

router.get('/', MealController.fetchAllMeals);
router.post('/', MealController.addAMeal);
router.get('/:id', MealController.getAMeal);
router.put('/:id', MealController.updateAMeal);
router.delete('/:id', MealController.deleteAMeal);

export default router;
