import { Router } from "express";
import {
  login,
  register,
  put,
  deleteUser,
} from "../controllers/userController.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.put("/:id", put);
router.delete("/:id", deleteUser);

export default router;