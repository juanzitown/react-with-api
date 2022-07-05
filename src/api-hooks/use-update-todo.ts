import { useMutation, useQueryClient } from "react-query";
import updateTodoService from "../services/update-todo-service";
import TaskType from "../types/task-type";

type UseUpdateTodoProps = {
  onSuccess: (data: TaskType) => void;
  onError: (error: any) => void;
};

function useUpadateTodo({ onSuccess, onError }: UseUpdateTodoProps) {
  const queryClient = useQueryClient();
  const { mutate: fetch, isLoading: pending } = useMutation(updateTodoService, {
    onSuccess: (data: TaskType) => {
      queryClient.invalidateQueries("/todos");
      onSuccess?.(data);
    },
    onError,
  });

  return { fetch, pending };
}

export default useUpadateTodo;
