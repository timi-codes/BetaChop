const Utility = {

  if (Number.isNaN(Number(mealId))) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid mealId. mealId must be a number',
    });
  }
};


