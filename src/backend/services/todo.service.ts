import { DbConnectionService } from "@/backend/services/db-connection.service";
import { CreateTodoInterface } from "@/backend/types/todo/create-todo.interface";
import { TodoModel } from "@/backend/models/todo.model";
import { Model } from "mongoose";

export class TodoService {
  dbService: DbConnectionService;

  constructor() {
    this.dbService = new DbConnectionService();
  }

  async createTodo(data: CreateTodoInterface): Promise<TodoModel> {
    await this.dbService.connectToDb();
    return new TodoModel(data).save();
  }
}
