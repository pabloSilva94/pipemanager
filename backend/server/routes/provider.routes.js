import { Router } from "express";
import {
  register,
  put,
  deleteProvider,
} from "../controllers/providerController.js";

const router = Router();

router.post("/register/:user_id", register);
router.put("/register/:id", put);
router.delete("/register/:id", deleteProvider); // Adicionada a barra '/' inicial

export default router;