import TaskType from "../types/task-type";
import api from "./api";

type GetTodosServiceProps = {};

async function getTodosService({}: GetTodosServiceProps) {
  const response = (await api.get("/todos")) as any;
  return response as TaskType[];
}

export default getTodosService;
