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
const model_t = model<UserInterface>("users", UserSchema)

export const UserModel =
  models.users as typeof model_t  || model<UserInterface>("users", UserSchema);
