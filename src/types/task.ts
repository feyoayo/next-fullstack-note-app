import { Schema } from "mongoose";

export interface CreateTaskInterface {
  title: string;
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
  priority: Priority;
  estimate: number;
}

export type Priority = "Low" | "Medium" | "High";
