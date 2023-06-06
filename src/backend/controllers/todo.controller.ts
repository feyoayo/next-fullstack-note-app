import { NextRequest, NextResponse } from "next/server";
import { CreateTodoInterface } from "@/backend/types/todo/create-todo.interface";
import { DbConnectionService } from "@/backend/services/db-connection.service";
import { NextApiRequest, NextApiResponse } from "next";
import { TodoModel } from "@/backend/models/todo.model";
import { BaseController } from "@/backend/common/base-controller";
import { TodoService } from "@/backend/services/todo.service";

export class TodoController extends BaseController {
  todoService: TodoService;
  constructor() {
    super();
    this.todoService = new TodoService();
  }
  async createTodo(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const body = req.body as unknown as CreateTodoInterface;

      if (!body) {
        throw new Error("Fields required");
      }

      const todo = this.todoService.createTodo(body);
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
  async getTodos(): Promise<any[]> {
    return [];
  }
}
