import TaskType from "../types/task-type";

type DeleteTodoServiceProps = {
  task: TaskType;
};

async function deleteTodoService({ task }: DeleteTodoServiceProps) {
  return fetch(`http://localhost:4000/todos/${task.id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(task),
  }).then(async (response) => {
    const responseAsJson = await response.json();
    return responseAsJson as TaskType;
  });
}

export default deleteTodoService;
