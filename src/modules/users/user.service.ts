import { Model } from "mongoose";
import { IUser, IUserModel, User } from "./user.model";

export class UserService {
  constructor(private userModel: Model<IUserModel>) {}

  async create(user: IUser): Promise<IUserModel> {
    return this.userModel.create(user);
  }

  async findByEmail(email: string): Promise<IUserModel | null> {
    return this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<IUserModel | null> {
    return this.userModel.findById(id);
  }
}

export const userService = new UserService(User);
