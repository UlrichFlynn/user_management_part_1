const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controllers");


router.get("/users", userCtrl.index);

router.get("/users/:id", userCtrl.getById);

router.get("*", userCtrl.pageNotFound);


module.exports = router;