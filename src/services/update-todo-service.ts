import TaskType from "../types/task-type";

type UpdateTodoServiceProps = {
  task: TaskType;
};

async function updateTodoService({ task }: UpdateTodoServiceProps) {
  console.log("Chegou no fetch:", task);
  return fetch(`http://localhost:4000/todos/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(task),
  }).then(async (response) => {
    const responseAsJson = await response.json();
    return responseAsJson as TaskType;
  });
}

export default updateTodoService;
