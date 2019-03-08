import config from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

import mealRoutes from './v1/routes/meal.route';
import orderRoutes from './v1/routes/order.route';
import menuRoutes from './v1/routes/menu.route';
import userRoutes from './v1/routes/user.route';

config.config();
const app = express();
const port = process.env.PORT || 7777;
const API_VERSION = '/api/v1';

app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(`${API_VERSION}/meals`, mealRoutes);
app.use(`${API_VERSION}/orders`, orderRoutes);
app.use(`${API_VERSION}/menu`, menuRoutes);
app.use(`${API_VERSION}/auth`, userRoutes);

app.get('/', (req, res) => {
  res.send('This app server is runninoninown 😀😎😋');
});

if (!module.parent) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
module.exports = app;
