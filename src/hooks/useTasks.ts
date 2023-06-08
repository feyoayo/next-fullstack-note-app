import { useMutation, useQuery, useQueryClient } from "react-query";
import { CreateTaskInterface } from "@/types/task";
import { TaskService } from "@/services/task.service";
import { toast } from "react-toastify";

export const queryKeys = {
  taskData: "taskData",
};

export default function useTasks({ tag }: { tag?: string }) {
  const queryClient = useQueryClient();
  const { data: response, isLoading: isTaskListLoading } = useQuery(
    [queryKeys.taskData, tag],
    {
      queryFn: () => TaskService.getTaskList(tag),
      onError: (err) => {
        toast.error("Task list getting error");
      },
    }
  );
  const { mutateAsync, isLoading: isCreationLoading } = useMutation(
    (data: CreateTaskInterface) => TaskService.createTask(data),
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
