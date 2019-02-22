import express from 'express';
import bodyParser from 'body-parser';
import mealRoutes from './routes/meal.route';
import orderRoutes from './routes/order.route';
import menuRoutes from './routes/menu.route';

const app = express();
const port = process.env.PORT || 7778;
const API_VERSION = '/api/v1';

app.use(bodyParser.json());

app.use(`${API_VERSION}/meals`, mealRoutes);
app.use(`${API_VERSION}/orders`, orderRoutes);
app.use(`${API_VERSION}/menu`, menuRoutes);

app.get('*', (request, response) => {
  response.status(404).json({
    status: 404,
    error: 'The route you are trying to access does not exist',
  });
});

if (!module.parent) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
module.exports = app;
