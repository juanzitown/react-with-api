import { AxiosResponse } from "axios";
import TaskType from "../types/task-type";
import api from "./api";

type UpdateTodoServiceProps = {
  task: TaskType;
};

async function updateTodoService({ task }: UpdateTodoServiceProps) {
  const response = (await api.put(
    `/todos/${task.id}`,
    task
  )) as AxiosResponse<TaskType>;
  return response.data;
}

export default updateTodoService;
