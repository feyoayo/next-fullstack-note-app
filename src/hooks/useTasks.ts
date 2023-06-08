import { useMutation, useQuery, useQueryClient } from "react-query";
import { CreateTaskInterface } from "@/types/task";
import { TodoService } from "@/services/todo.service";
import { toast } from "react-toastify";

export const queryKeys = {
  taskData: "taskData",
};

export default function useTasks({ tag }: { tag?: string }) {
  const queryClient = useQueryClient();
  const { data: response, isLoading: isTaskListLoading } = useQuery(
    [queryKeys.taskData, tag],
    {
      queryFn: () => TodoService.getTaskList(tag),
      onError: (err) => {
        toast.error("Task list getting error");
      },
    }
  );
  const { mutateAsync, isLoading: isCreationLoading } = useMutation(
    (data: CreateTaskInterface) => TodoService.createTask(data),
    {
      onSuccess: () => {
        toast.success("Task created successfully");
        queryClient.invalidateQueries({ queryKey: [queryKeys.taskData] });
      },
      onError: (error) => {
        toast.error("Task creation failed");
      },
    }
  );

  const createTask = async (data: CreateTaskInterface) => {
    await mutateAsync(data);
  };

  return {
    createTask,
    isCreationLoading,
    tasks: response?.data ?? [],
    isTaskListLoading,
  };
}
