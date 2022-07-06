import { AxiosResponse } from "axios";
import TaskType from "../types/task-type";
import api from "./api";

type CreateTodoServiceProps = {
  task: TaskType;
};

async function createTodoService({ task }: CreateTodoServiceProps) {
  const response = (await api.post("/todos", task)) as AxiosResponse<TaskType>;
  return response.data as TaskType;
}

export default createTodoService;
