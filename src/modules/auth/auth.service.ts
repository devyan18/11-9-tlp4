import jwt from "jsonwebtoken";
import { environments } from "../../config/environments";
import { userService } from "../users/user.service";
import { compare } from "bcrypt";

type TokenPayload = {
  userId: string;
};

export class AuthService {
  static async verifyToken(token: string) {
    const payload = jwt.verify(token, environments.JWT_SECRET) as TokenPayload;

    if (!payload.userId) {
      throw new Error("Invalid token");
    }

    return payload;
  }

  static async generateToken(payload: TokenPayload) {
    return jwt.sign(payload, environments.JWT_SECRET, {
      expiresIn: "5h",
    });
  }

  async signIn(email: string, password: string) {
    const user = await userService.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    const token = await AuthService.generateToken({ userId: user.id });

    return { user, token };
  }

  async signUp(email: string, password: string, username: string) {
    const user = await userService.findByEmail(email);

    if (user) {
      throw new Error("User already exists");
    }

    const createdUser = await userService.create({
      email,
      password,
      username,
    });

    const token = await AuthService.generateToken({ userId: createdUser.id });

    return { user: createdUser, token };
  }
}
