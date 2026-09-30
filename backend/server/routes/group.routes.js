import { Router } from "express";
import {
  getAllGroup,
  register,
  put,
  deleteGroup,
} from "../controllers/groupController.js";

const router = Router();

router.post("/", getAllGroup);
router.post("/register/:user_id", register);
router.put("/register/", put);
router.delete("/register/", deleteGroup);

export default router;