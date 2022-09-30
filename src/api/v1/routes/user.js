const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");

const PAGE_SIZE = 10;
router.get("/", function (req, res, next) {
  var page = parseInt(req.query.page);
  var limit = parseInt(req.query.limit);
  if (page) {
    page = page < 1 ? (page = 1) : page;
    var skip = (page - 1) * (limit ? limit : PAGE_SIZE);
    UserModel.find({})
      .skip(skip)
      .limit(limit ? limit : PAGE_SIZE)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json("Error Server");
      });
  } else {
    UserModel.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json("Error Server");
      });
  }
});
router.get("/:id", function (req, res, next) {
  var id = req.params.id;
  UserModel.findById(id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json("Error Server");
    });
});
router.post("/", function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  UserModel.create({ username, password })
    .then((data) => {
      res.json("Create User Successfully");
    })
    .catch((err) => {
      res.json("Create User Failed");
    });
});
router.put("/:id", function (req, res, next) {
  var id = req.params.id;
  var newPassword = req.body.newPassword;
  UserModel.findByIdAndUpdate(id, { password: newPassword })
    .then((data) => {
      res.json("Update User Successfully");
    })
    .catch((err) => {
      res.status(500).json("Update User Failed");
    });
});
router.delete("/:id", function (req, res, next) {
  var id = req.params.id;
  UserModel.findByIdAndDelete(id)
    .then((data) => {
      res.json("Delete User Successfully");
    })
    .catch((err) => {
      res.status(500).json("Delete User Failed");
    });
});

module.exports = router;
