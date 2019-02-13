const express = require("express");

const app = express();

const PORT = 8080;

app.get("/", (req, res) => {
  res.send("Api is working");
});

app.listen(PORT, function() {
  console.log(`Server is running on port ${PORT}`);
});
