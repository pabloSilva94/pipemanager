const express = require("express");

const router = express.Router();
const controller = require("../controllers/taskController");

router.get("/:group_id", controller.getAllTask);
router.post("/register/:group_id", controller.register);
//router.put("/register/:id", controller.put);
router.put("/:group_id/register/:id", controller.alterStatus);

router.delete("/:group_id/register/:id", controller.delete);

module.exports = router;
