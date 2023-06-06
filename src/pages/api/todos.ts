import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { TodoController } from "@/backend/controllers/todo.controller";

const todosRoute = createRouter<NextApiRequest, NextApiResponse>();

todosRoute.post(async (req, res) => {
  const controller = new TodoController();
  await controller.createTodo(req, res);
});

export default todosRoute.handler();
