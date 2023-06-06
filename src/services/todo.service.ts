import Axios from "@/config/axios-config";
import { CreateTodoInterface, TodoModelInterface } from "@/types/todo";

export class TodoService {
  static async createTodo(body: CreateTodoInterface) {
    return await Axios.post("/todos", body);
  }
  static async getTodosList() {
    const data = await Axios.get<{ data: TodoModelInterface[] }>("/todos");
    return data.data;
  }
}
