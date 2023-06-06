import { DbConnectionService } from "@/backend/services/db-connection.service";
import { TodoModel } from "@/backend/models/todo.model";
import { CreateTodoPayloadInterface, TodoModelInterface } from "@/types/todo";

export class TodoService {
  dbService: DbConnectionService;

  constructor() {
    this.dbService = new DbConnectionService();
  }

  async createTodo(
    data: CreateTodoPayloadInterface
  ): Promise<TodoModelInterface> {
    await this.dbService.connectToDb();
    return new TodoModel(data).save();
  }

  async getTodos(userId: string): Promise<TodoModelInterface[]> {
    return TodoModel.find({ userId });
  }
}
