import { Router } from "express";
import AuthController from "../controllers/Auth.controller";
import Validate from "../middleware/Validate";

const router = Router();

router.post("/client", Validate.validateUser, AuthController.createClient);
router.post("/staff", Validate.validateUser, AuthController.createStaff);
router.post("/login", Validate.validateLogin, AuthController.login);
router.post("/admin", Validate.validateUser, AuthController.adminRegister);

export default router;
