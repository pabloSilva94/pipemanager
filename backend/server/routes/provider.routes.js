const express = require("express");

const router = express.Router();
const controller = require("../controllers/providerController");

router.post("/register/:user_id", controller.register);
router.put("/register/:id", controller.put);
router.delete("register/:id", controller.delete);

module.exports = router;
