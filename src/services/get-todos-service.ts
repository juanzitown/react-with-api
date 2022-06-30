import TaskType from "../types/task-type";

type GetTodosServiceProps = {};

async function getTodosService({}: GetTodosServiceProps) {
  return fetch(
    "https://my-json-server.typicode.com/juanzitown/react-with-api/todos",
    { method: "GET" }
  ).then(async (response) => {
    const responseAsJson = await response.json();
    return responseAsJson as TaskType[];
  });
}

export default getTodosService;
