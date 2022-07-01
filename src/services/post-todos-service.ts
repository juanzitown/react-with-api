import TaskType from "../types/task-type";

type PostTodosServiceProps = {
  id: number;
  title: string;
};

async function postTodosService(task: PostTodosServiceProps) {
  return fetch("http://localhost:3333/todos/", {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then(async (response) => {
    const responseAsJson = await response.json();
    return responseAsJson as TaskType[];
  });
}

export default postTodosService;
