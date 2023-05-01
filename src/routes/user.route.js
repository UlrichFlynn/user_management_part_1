const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controllers");


router.get("/users", userCtrl.index);

router.get("/users/:id", userCtrl.getById);

router.get("/users-add", userCtrl.getAdd);

router.post("/users/new", userCtrl.create);

router.get("/", userCtrl.api_getAll);

router.get("/:id", userCtrl.api_getById);


module.exports = router;