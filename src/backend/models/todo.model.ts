import { Model, model, models, Schema } from "mongoose";
import { CollectionNameEnum } from "@/backend/enums/collection-name.enum";
import { TodoModelInterface } from "@/types/todo";

const todoSchema = new Schema<TodoModelInterface>({
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
  completed: {
    type: Boolean,
    default: "false",
  },
});

todoSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export const TodoModel = (models?.todos ||
  model(CollectionNameEnum.todos, todoSchema)) as Model<TodoModelInterface>;
