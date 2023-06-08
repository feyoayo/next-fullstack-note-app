import Axios from "@/config/axios-config";
import { CreateTaskInterface, TaskModelInterface } from "@/types/task";

export class TaskService {
  static async createTask(body: CreateTaskInterface) {
    return await Axios.post("/tasks", body);
  }
  static async getTaskList(tag?: string) {
    const data = await Axios.get<{ data: TaskModelInterface[] }>("/tasks", {
      params: { tag },
    });
    return data.data;
  }
  static async updateTaskColumn(data: { column: string; id: string }) {
    return Axios.patch("/tasks/update_column", data);
  }
}
