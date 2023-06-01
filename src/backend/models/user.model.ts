import { UserInterface } from "@/types/auth";
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema<UserInterface>({
  email: {
    type: String,
    required: true,
    unique: true,
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
});

export const UserModel =
  models.users || model<UserInterface>("users", UserSchema);