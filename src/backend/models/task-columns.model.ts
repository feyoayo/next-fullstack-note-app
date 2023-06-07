import { model, models, Schema } from "mongoose";
import { CollectionNameEnum } from "@/backend/enums/collection-name.enum";

const schema = new Schema({
  userId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: CollectionNameEnum.users,
  },
  taskColumns: {
    type: [String],
    default: ["Backlog", "Done"],
  },
});

export const TaskColumnsModel =
  models[CollectionNameEnum.taskColumn] ||
  model(CollectionNameEnum.taskColumn, schema);
