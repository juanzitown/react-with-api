import { useMutation, useQueryClient } from "react-query";
import createTodoService from "../services/create-todo-service";
import TaskType from "../types/task-type";

type UseCreateTodoProps = {
  onSuccess: (data: TaskType) => void;
  onError: (error: any) => void;
};

function useCreateTodo({ onSuccess, onError }: UseCreateTodoProps) {
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

export default useCreateTodo;
