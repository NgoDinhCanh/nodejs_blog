const express = require("express");
const app = express();
require("dotenv").config();
const router = require("./api/v1/routes/auth");
const routerUser = require("./api/v1/routes/user");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use("/api/v1/", router);
app.use("/api/v1/user", routerUser);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
