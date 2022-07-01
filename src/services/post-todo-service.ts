import TaskType from "../types/task-type";

type PostTodoServiceProps = {
  task: TaskType;
};

async function postTodoService(task: PostTodoServiceProps) {
  console.log("post", task);
  return fetch(
    "https://my-json-server.typicode.com/juanzitown/react-with-api/todos",
    {
      method: "POST",
      body: JSON.stringify(task),
      headers: { "Content-type": "application/json" },
    }
  ).then(async (response) => {
    const responseAsJson = await response.json();
    return responseAsJson as TaskType[];
  });
}

export default postTodoService;
