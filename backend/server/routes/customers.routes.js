import { Router } from "express";
import {
  getAllCustomers,
  register,
  put,
  deleteCustomer,
} from "../controllers/customersController.js";

const router = Router();

router.get("/:user_id", getAllCustomers);
router.post("/register/:user_id", register);
router.put("/register/:id", put);
router.delete("/register/:user_id/:id", deleteCustomer);

export default router;