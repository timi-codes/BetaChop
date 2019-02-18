import express from 'express';
import bodyParser from 'body-parser';
import mealRoutes from './routes/meal.route';
import orderRoutes from './routes/order.route';

const app = express();
const port = process.env.PORT || 7778;
const API_VERSION = '/api/v1';

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Api is working');
});

app.use(`${API_VERSION}/meals`, mealRoutes);
app.use(`${API_VERSION}/orders`, orderRoutes);

if (!module.parent) {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${port}`);
  });
}

// Expose espress server for testing
module.exports = app;
