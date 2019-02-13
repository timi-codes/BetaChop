import express from 'express';

const app = express();

const PORT = 7778;

app.get('/', (req, res) => {
  res.send('Api is working');
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});
