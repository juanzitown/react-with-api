import { useMutation, useQueryClient } from "react-query";
import createTodoService from "../services/create-todo-service";
import TaskType from "../types/task-type";

type UseUpdateTodoProps = {
  onSuccess: (data: TaskType) => void;
  onError: (error: any) => void;
};

function useUpdateTodo({ onSuccess, onError }: UseUpdateTodoProps) {
  const queryClient = useQueryClient();
  const { mutate: fetch, isLoading: pending } = useMutation(createTodoService, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("/todos");
      onSuccess?.(data);
    },
    onError,
  });

  return { fetch, pending };
}

export default useUpdateTodo;
