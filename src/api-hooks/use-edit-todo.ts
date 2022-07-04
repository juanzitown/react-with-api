import { useMutation, useQueryClient } from "react-query";
import editTodoService from "../services/edit-todo-service";
import TaskType from "../types/task-type";

type useEditTodoType = {
  onSuccess?: (data: TaskType) => void;
  onError?: (error: any) => void;
};

const useEditTodo = ({ onSuccess, onError }: useEditTodoType) => {
  const queryClient = useQueryClient();
  const { mutate: fetch, isLoading: pending } = useMutation(editTodoService, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("/todos");
      onSuccess?.(data);
    },
    onError,
  });

  return { fetch, pending };
};

export default useEditTodo;
