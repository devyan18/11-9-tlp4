import { Request, Response, NextFunction } from "express";

import { userService } from "../users/user.service";
import { AuthService } from "./auth.service";
import { IUserDocument } from "../users/user.model";

declare global {
  namespace Express {
    interface Request {
      user: IUserDocument;
    }
  }
}

export class AuthMiddleware {
  static async validateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenWithBearer = req.headers.authorization;

      const token = tokenWithBearer?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Token is required" });
      }

      const { userId } = await AuthService.verifyToken(token);

      if (!userId) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const user = await userService.findById(userId);

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;

      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
}
