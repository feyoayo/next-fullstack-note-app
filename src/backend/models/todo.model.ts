import { Model, model, models, Schema } from "mongoose";
import { CollectionNameEnum } from "@/backend/enums/collection-name.enum";
import { TaskModelInterface } from "@/types/todo";

const todoSchema = new Schema<TaskModelInterface>({
  title: {
    required: true,
    type: String,
  },
  userId: {
    ref: CollectionNameEnum.users,
    required: true,
    type: Schema.Types.ObjectId,
  },
  tags: [{ type: String }],
  when: {
    type: Date,
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
  column: {
    type: String,
    default: "Backlog",
  },
});

todoSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export const TodoModel = (models?.todos ||
  model(CollectionNameEnum.todos, todoSchema)) as Model<TaskModelInterface>;
