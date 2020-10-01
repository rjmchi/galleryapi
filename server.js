const express = require("express");
const app = express();

const db = require("./models");
const PORT = process.env.port || 3000;

app.use(express.json());

const router = require("./routes/api");

app.use("/api", router);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on ${PORT}...`);
  });
});
