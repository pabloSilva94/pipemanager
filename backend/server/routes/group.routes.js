const express = require("express");

const router = express.Router();
const controller = require("../controllers/groupController");

router.post("/", controller.getAllGroup);
router.post("/register/:user_id", controller.register);
router.put("/register/", controller.put);
router.delete("/register/", controller.delete);

module.exports = router;
