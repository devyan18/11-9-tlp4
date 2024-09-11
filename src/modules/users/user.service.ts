import { Model } from "mongoose";
import { IUser, IUserDocument, User } from "./user.model";

export class UserService {
  constructor(private userModel: Model<IUserDocument>) {}

  async create(user: IUser): Promise<IUserDocument> {
    return this.userModel.create(user);
  }

  async findByEmail(email: string): Promise<IUserDocument | null> {
    return this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<IUserDocument | null> {
    return this.userModel.findById(id);
  }
}

export const userService = new UserService(User);
