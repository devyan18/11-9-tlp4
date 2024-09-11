import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { environments } from "../../config/environments";

import { userService } from "../users/user.service";

export class AuthMiddleware {
  static async validateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: "Token is required" });
      }
      // Validate token
      const { userId } = jwt.verify(token, environments.JWT_SECRET);

      // Attach user to request

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
