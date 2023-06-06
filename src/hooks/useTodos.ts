import { useMutation, useQuery, useQueryClient } from "react-query";
import { CreateTodoInterface } from "@/types/todo";
import { TodoService } from "@/services/todo.service";
import { toast } from "react-toastify";

export default function useTodos({ tag }: { tag?: string }) {
  const queryClient = useQueryClient();
  const { data: response, isLoading: isTodoListLoading } = useQuery(
    ["todoData", tag],
    {
      queryFn: () => TodoService.getTodosList(tag),
      onError: (err) => {
        toast.error("Todo list getting error");
      },
    }
  );
  const { mutateAsync, isLoading: isCreationLoading } = useMutation(
    (data: CreateTodoInterface) => TodoService.createTodo(data),
    {
      onSuccess: () => {
        toast.success("Todo created successfully");
        queryClient.invalidateQueries({ queryKey: ["todoData"] });
      },
      onError: (error) => {
        toast.error("Todo creation failed");
      },
    }
  );

  const createTodo = async (data: CreateTodoInterface) => {
    await mutateAsync(data);
  };

  return {
    createTodo,
    isCreationLoading,
    todos: response?.data ?? [],
    isTodoListLoading,
  };
}
