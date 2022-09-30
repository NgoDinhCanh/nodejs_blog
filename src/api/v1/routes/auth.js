const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");

router.get("/", function (req, res) {
  console.log(req.body);
  res.json("Hello Worlds");
});
router.post("/register", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  UserModel.findOne({ username: username })
    .then((data) => {
      if (data) {
        res.json("User does not exist");
      } else {
        return UserModel.create({ username: username, password: password });
      }
    })
    .then((data) => {
      res.status(200).json("Create User Successfully");
    })
    .catch((err) => {
      res.status(500).json("Create User Failed");
    });
});
router.post("/login", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  UserModel.findOne({ username: username, password: password })
    .then((data) => {
      if (data) {
        res.json("Login Successfully");
      } else {
        res.json("Login Failed");
      }
    })
    .catch((err) => {
      res.status(500).json("Create User Failed");
    });
});

module.exports = router;
