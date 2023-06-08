import Axios from "@/config/axios-config";
import { CreateTaskInterface, TaskModelInterface } from "@/types/task";

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
  static async updateTaskColumn(data: { column: string; id: string }) {
    return Axios.patch("/tasks/update_column", data);
  }
}
