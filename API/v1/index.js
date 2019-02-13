const express = require('express');

const app = express();

const PORT = 7778;

app.get('/', (req, res) => {
  res.send('Api is working');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
