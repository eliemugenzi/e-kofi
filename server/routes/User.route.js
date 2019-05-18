import { Router } from "express";
import UserController from "../controllers/User.controller";
import Auth from "../middleware/Auth";

const router = Router();

router.get("/", UserController.getAll);
router.get("/:id", UserController.getOne);
router.get("/:userId/activate", Auth.verifyToken, UserController.activateStaff);

export default router;
