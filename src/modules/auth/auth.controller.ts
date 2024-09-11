import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async signIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const { user, token } = await this.authService.signIn(email, password);

      return res.status(200).json({ user, token });
    } catch (error: Error | any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async signUp(req: Request, res: Response) {
    try {
      const { email, password, username } = req.body;

      const { user, token } = await this.authService.signUp(
        email,
        password,
        username
      );

      return res.status(200).json({ user, token });
    } catch (error: Error | any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async signMe(req: Request, res: Response) {
    try {
      const user = req.user;

      return res.status(200).json({ user });
    } catch (error: Error | any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
