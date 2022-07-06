import TaskType from "../types/task-type";
import api from "./api";

type UpdateTodoServiceProps = {
  task: TaskType;
};

async function updateTodoService({ task }: UpdateTodoServiceProps) {
  const response = (await api.put(`/todos/${task.id}`)) as any;
  return response as TaskType;
}

export default updateTodoService;
