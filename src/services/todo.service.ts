import Axios from "@/config/axios-config";
import { CreateTodoInterface } from "@/types/todo";

export class TodoService {
  static async createTodo(body: CreateTodoInterface) {
    return await Axios.post("/todos", body);
  }
  static async getTodosList() {
    return await Axios.get("/todos");
  }
}
