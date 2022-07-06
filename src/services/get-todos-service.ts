import { AxiosResponse } from "axios";
import TaskType from "../types/task-type";
import api from "./api";

type GetTodosServiceProps = {};

async function getTodosService({}: GetTodosServiceProps) {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("");
    }, 3000);
  });
  const response = (await api.get("/todos")) as AxiosResponse<TaskType[]>;
  const tasks = response.data;
  return tasks;
}

export default getTodosService;
