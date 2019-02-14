import express from 'express';
import bodyParser from 'body-parser';
import mealRoutes from './routes/meal.route';

const app = express();
const PORT = 7778;
const API_VERSION = '/api/v1';

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Api is working');
});

app.use(`${API_VERSION}/meals`, mealRoutes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});
