import { useQuery } from "react-query";
import getTodosService from "../services/get-todos-service";

type UseGetTodosProps = {};

function useGetTodos({}: UseGetTodosProps) {
  const { data: todos, isLoading: pending } = useQuery(
    "/todos",
    getTodosService
  );

  return {
    data: todos,
    pending,
  };
}

export default useGetTodos;
