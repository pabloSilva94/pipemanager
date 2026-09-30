import { Router } from "express";
import {
  getAllTask,
  register,
  alterStatus,
  deleteTask,
} from "../controllers/taskController.js";

const router = Router();

router.get("/:group_id", getAllTask);
router.post("/register/:group_id", register);
router.put("/:group_id/register/:id", alterStatus);
router.delete("/:group_id/register/:id", deleteTask);

export default router;