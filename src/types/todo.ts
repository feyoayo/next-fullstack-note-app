import { Schema } from "mongoose";

export interface CreateTodoInterface {
  title: string;
  when?: Date;
  tags: string[];
}

export interface CreateTodoPayloadInterface extends CreateTodoInterface {
  userId: string;
}
export interface TodoModelInterface extends CreateTodoInterface {
  userId: Schema.Types.ObjectId;
  createdAt: number;
  updatedAt?: number;
  completed?: boolean;
  _id?: string;
}
