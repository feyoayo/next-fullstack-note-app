import { NextApiRequest, NextApiResponse } from "next";
import { BaseController } from "@/backend/common/base-controller";
import { TodoService } from "@/backend/services/todo.service";
import { CreateTaskInterface } from "@/types/todo";

export class TodoController extends BaseController {
  todoService: TodoService;
  constructor() {
    super();
    this.todoService = new TodoService();
  }
  async createTodo(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const body = req.body as unknown as CreateTaskInterface;
      if (!body) {
        throw new Error("Fields required");
      }
      const todo = await this.todoService.createTodo({
        ...body,
        userId: req.user.userId,
      });
      if (!todo) {
        throw new Error("Todo not created");
      }
      this.created(res, todo);
    } catch (e) {
      this.errorMessage(e, res);
    }
  }
  async updateTodo(): Promise<unknown> {
    return false;
  }
  async getTodo(): Promise<unknown> {
    return false;
  }
  async getTodos(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const tag = String(req.query.tag);
      const todoList = await this.todoService.getTodos(req.user.userId, tag);
      this.ok(res, todoList);
    } catch (e) {
      this.errorMessage(e, res);
    }
  }
}
