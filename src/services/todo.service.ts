import Axios from "@/config/axios-config";
import { CreateTaskInterface, TaskModelInterface } from "@/types/todo";

export class TodoService {
  static async createTask(body: CreateTaskInterface) {
    return await Axios.post("/todos", body);
  }
  static async getTaskList(tag?: string) {
    const data = await Axios.get<{ data: TaskModelInterface[] }>("/todos", {
      params: { tag },
    });
    return data.data;
  }
}
