import TaskType from "../types/task-type";
import api from "./api";

type CreateTodoServiceProps = {
  task: TaskType;
};

async function createTodoService({ task }: CreateTodoServiceProps) {
  const response = (await api.post("/todos", task)) as any;
  return response as TaskType;
}

export default createTodoService;
