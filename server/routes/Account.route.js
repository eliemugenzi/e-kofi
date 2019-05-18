import { Router } from "express";
import Auth from "../middleware/Auth";
import AccountController from "../controllers/Account.controller";
import Validate from "../middleware/Validate";


const router = Router();

router.get("/", Auth.verifyToken, AccountController.filterAccounts);
router.get("/:accountNumber", Auth.verifyToken, AccountController.getAccount);
router.post("/:accountNumber/debit", Auth.verifyToken, Validate.validateAmount, AccountController.debit);
router.post("/:accountNumber/credit", Auth.verifyToken, Validate.validateAmount, AccountController.credit);
router.post("/", Auth.verifyToken, AccountController.createAccount);
router.post("/saving", Auth.verifyToken, AccountController.createSavingOne);
router.delete("/:accountNumber", Auth.verifyToken, AccountController.deleteAccount);
router.get("/:accountNumber/transactions", Auth.verifyToken, AccountController.getTransactions);

export default router;
