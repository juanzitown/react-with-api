import { useMutation, useQueryClient } from "react-query";
import deleteTodoService from "../services/delete-todo-service";
import TaskType from "../types/task-type";

type useDeleteTodoType = {
  onSuccess?: (data: TaskType) => void;
  onError?: (error: any) => void;
};

const useDeleteTodo = ({ onSuccess, onError }: useDeleteTodoType) => {
  const queryClient = useQueryClient();
  const { mutate: fetch, isLoading: pending } = useMutation(deleteTodoService, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("/todos");
      onSuccess?.(data);
    },
    onError,
  });

  return { fetch, pending };
};

export default useDeleteTodo;
