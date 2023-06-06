import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { TodoController } from "@/backend/controllers/todo.controller";
import tokenMiddleware from "@/backend/middlewares/token.middleware";

const todosRoute = createRouter<NextApiRequest, NextApiResponse>();

todosRoute.use(tokenMiddleware);
todosRoute.post(async (req, res) => {
  const controller = new TodoController();
  await controller.createTodo(req, res);
});

export default todosRoute.handler();
