import { create } from "zustand";
import { TaskModelInterface } from "@/types/task";

interface TaskSidebar {
  isOpened: boolean;
  selectedTask: null | TaskModelInterface;
  selectTask: (task: TaskModelInterface | null) => void;
  closeSidebar: () => void;
}

const useTaskSidebar = create<TaskSidebar>((setState) => ({
  isOpened: false,
  selectedTask: null,
  selectTask: (task) =>
    setState((state) => ({ isOpened: true, selectedTask: task })),
  closeSidebar: () => setState((state) => ({ ...state, isOpened: false })),
}));

export default useTaskSidebar;
