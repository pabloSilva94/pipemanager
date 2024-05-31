const express = require("express");

const router = express.Router();
const controller = require("../controllers/userController");

router.post("/login", controller.login);

router.post("/register", controller.register);
router.put("/:id", controller.put);
router.delete("/:id", controller.delete);

module.exports = router;
