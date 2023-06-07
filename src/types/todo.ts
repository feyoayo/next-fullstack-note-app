import { Schema } from "mongoose";

export interface CreateTaskInterface {
  title: string;
  when?: Date;
  tags: string[];
}

export interface CreateTaskPayloadInterface extends CreateTaskInterface {
  userId: string;
}
export interface TaskModelInterface extends CreateTaskInterface {
  userId: Schema.Types.ObjectId;
  createdAt: number;
  updatedAt?: number;
  column?: string;
  _id?: string;
}
