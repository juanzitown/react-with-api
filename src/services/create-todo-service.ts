import TaskType from "../types/task-type";

type CreateTodoServiceProps = {
  task: TaskType;
};

async function createTodoService({ task }: CreateTodoServiceProps) {
  return fetch("http://localhost:4000/todos", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(task),
  }).then(async (response) => {
    const responseAsJson = await response.json();
    return responseAsJson as TaskType;
  });
}

export default createTodoService;
