import config from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mealRoutes from './v1/routes/meal.route';
import orderRoutes from './v1/routes/order.route';
import menuRoutes from './v1/routes/menu.route';

config.config();
const app = express();
const port = process.env.PORT || 7777;
const API_VERSION = '/api/v1';

app.use(bodyParser.json());

app.use(`${API_VERSION}/meals`, mealRoutes);
app.use(`${API_VERSION}/orders`, orderRoutes);
app.use(`${API_VERSION}/menu`, menuRoutes);

/* istanbul ignore next */

if (!module.parent) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
module.exports = app;
