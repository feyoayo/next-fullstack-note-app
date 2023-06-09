import { UserInterface } from "@/types/auth";
import { model, Model, models, Schema } from "mongoose";

const UserSchema = new Schema<UserInterface>({
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    default: "USER",
    type: String,
  },
  accountType: {
    required: true,
    type: String,
  },
});

export const UserModel: Model<UserInterface> =
  models?.users || model<UserInterface>("users", UserSchema);
