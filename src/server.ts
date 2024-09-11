import express, { type Application } from "express";
import { connect } from "mongoose";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import { environments } from "./config/environments";
import { authRouter } from "./modules/auth/auth.router";

class App {
  constructor(
    private app: Application,
    private port: number = 4000,
    private uri: string
  ) {}

  public async database(): Promise<void> {
    try {
      const db = await connect(this.uri);
      console.log(`Connected to ${db.connection.name}`);
    } catch (error) {
      console.error(error);
    }
  }

  public middleware(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(helmet());
  }

  public routes(): void {
    this.app.use("/api/auth", authRouter);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on ${this.uri}`);
    });
  }
}

export const app = new App(express(), environments.PORT, environments.URI);
