import { TodoModel } from "@/backend/models/todo.model";
import { DbConnectionService } from "@/backend/services/db-connection.service";
import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next/types";

const updateColumnRouter = createRouter<NextApiRequest, NextApiResponse>();

updateColumnRouter.patch(async (req, res) => {
  const { column, id } = req.body;
  const dbService = new DbConnectionService();
  await dbService.connectToDb();
  await TodoModel.updateOne({ _id: id }, { $set: { column } });
  res.status(200).json({ column, id });
});

export default updateColumnRouter.handler();
