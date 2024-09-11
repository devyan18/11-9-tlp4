import { Router } from "express";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AuthMiddleware } from "./auth.middleware";

const authRouter = Router();
const authService = new AuthService();
const authController = new AuthController(authService);

authRouter.post("/sign-in", authController.signIn.bind(authController));
authRouter.post("/sign-up", authController.signUp.bind(authController));
authRouter.get(
  "/sign-me",
  AuthMiddleware.validateToken,
  authController.signMe.bind(authController)
);

export { authRouter };
