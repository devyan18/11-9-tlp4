import { Document, model, Schema } from "mongoose";
import { hash, genSalt } from "bcrypt";

export type IUser = {
  username: string;
  email: string;
  password: string;
};

export type IUserModel = IUser & Document;

const userSchema = new Schema<IUserModel>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await genSalt(10);

  this.password = await hash(this.password, salt);

  next();
});

export const User = model<IUserModel>("User", userSchema);
