import { Model, model, models, Schema } from "mongoose";
import { CollectionNameEnum } from "@/backend/enums/collection-name.enum";
import { TaskModelInterface } from "@/types/task";

const todoSchema = new Schema({
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
  createdAt: {
    type: Number,
    default: Date.now(),
  },
  updatedAt: {
    type: Number,
  },
  column: {
    type: String,
    default: "Backlog",
  },
  priority: {
    type: String,
    default: "Medium",
  },
  estimate: {
    type: Number,
    default: 0,
  },
});

todoSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export const TodoModel = (models?.[CollectionNameEnum.tasks] ||
  model(CollectionNameEnum.tasks, todoSchema)) as Model<TaskModelInterface>;
