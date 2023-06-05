import { model, models, Schema } from "mongoose";
import { CollectionNameEnum } from "@/backend/enums/collection-name.enum";

interface TodoModel {
  title: string;
  userId: Schema.Types.ObjectId;
  createdAt: number;
  updatedAt?: number;
  tags: string[];
  when?: Date;
  completed?: boolean;
}

const todoSchema = new Schema<TodoModel>({
  title: {
    required: true,
    type: String,
  },
  completed: {
    default: false,
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
});

todoSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export const TodoModel =
  models?.todos || model(CollectionNameEnum.todos, todoSchema);
