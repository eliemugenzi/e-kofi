import { Router } from "express";
import Auth from "../middleware/Auth";
import TransactionController from "../controllers/Transaction.controller";

const router = Router();

router.get("/", Auth.verifyToken, TransactionController.getAll);
router.get("/:id", Auth.verifyToken, TransactionController.getOne);

export default router;
