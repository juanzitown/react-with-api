import { useMutation, useQueryClient } from "react-query";
import deleteTodoService from "../services/delete-todo-service";
import TaskType from "../types/task-type";

type UseDeleteTodoProps = {
  onSuccess: (data: TaskType) => void;
  onError: (error: any) => void;
};

function useDeleteTodo({ onSuccess, onError }: UseDeleteTodoProps) {
  const queryClient = useQueryClient();
  const { mutate: fetch, isLoading: pending } = useMutation(deleteTodoService, {
    onSuccess: (data: TaskType) => {
      queryClient.invalidateQueries("/todos");
      onSuccess?.(data);
    },
    onError,
  });

  return { fetch, pending };
}

export default useDeleteTodo;
