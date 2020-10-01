const express = require("express");
const app = express();

const db = require("./models");
const PORT = process.env.port || 3000;

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const router = require("./routes/api");

app.use("/api", router);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on ${PORT}...`);
  });
});
