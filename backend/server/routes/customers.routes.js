const express = require("express");

const router = express.Router();
const controller = require("../controllers/customersController");

router.get("/:user_id", controller.getAllCustomers);

router.post("/register/:user_id", controller.register);
router.put("/register/:id", controller.put);
router.delete("/register/:user_id/:id", controller.delete);

module.exports = router;
